import {
  createHTMLTable,
  QuestionnaireState,
} from '../../../../features/Questionnaire';
import { Pipedrive } from '../../../pipedrive';
import { Strapi } from '../../../strapi';
import { enrichPostalCodeValue } from './utils/enrichPostalCodeValue';

export type CreateLeadInPipedriveProps = {
  host: string;
  contact: QuestionnaireState['contact'];
  questionnaire: QuestionnaireState['questionnaire'];
};

export const createLeadInPipedrive = async (
  data: CreateLeadInPipedriveProps,
) => {
  const api = await Strapi.getPipedriveApi(data.host);
  const token = api?.attributes?.api_token;
  if (!token) throw new Error('Missing Pipedrive token for domain.');

  data.contact.postalCode = enrichPostalCodeValue({
    host: data.host,
    contactData: data.contact,
  });

  const person =
    (await Pipedrive.getPersonByEmail(token, data.contact.email ?? '')) ??
    (await Pipedrive.createPersonWithCustomPostalCodeField(token, {
      contactData: data.contact,
    }));

  const lead = await Pipedrive.createLead(token, {
    person_id: person.id,
    title: `${person.name} (${data.host})`,
  });

  const note = await Pipedrive.createNote(token, {
    lead_id: lead.id,
    content: createHTMLTable(data.questionnaire),
  });

  return { person, lead, note };
};
