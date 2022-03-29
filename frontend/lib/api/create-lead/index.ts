import type {
  ContactData,
  QuestionnaireItem,
} from '../../../context/Questionnaire/state';
import { StrapiAPI } from '../../../interface/backend';
import { PipedriveAPI } from '../../../interface/pipedrive';
import { createHTMLTable } from '../../../utils/createHTMLTable';
import { enrichPostalCodeValue } from './utils/enrichPostalCodeValue';

export type CreateLeadInPipedriveProps = {
  host: string;
  contact: ContactData;
  questionnaire: QuestionnaireItem[];
};

export const createLeadInPipedrive = async (
  data: CreateLeadInPipedriveProps,
) => {
  try {
    const token = await StrapiAPI.getPipedriveAPITokenByDomain(data.host);
    if (!token) throw new Error('Missing Pipedrive token for domain.');

    data.contact.postalCode.value = enrichPostalCodeValue(data.contact);

    const person =
      (await PipedriveAPI.getPersonByEmail(token, data.contact.email.value)) ??
      (await PipedriveAPI.createPersonWithCustomPostalCodeField(token, {
        contactData: data.contact,
      }));

    const lead = await PipedriveAPI.createLead(token, {
      person_id: person.id,
      title: `${person.name} (${data.host})`,
    });

    const note = await PipedriveAPI.createNote(token, {
      lead_id: lead.id,
      content: createHTMLTable(data.questionnaire),
    });

    return { person, lead, note };
  } catch (error) {
    throw error;
  }
};
