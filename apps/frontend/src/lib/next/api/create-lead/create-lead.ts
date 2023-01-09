import { Strapi } from '../../../strapi';
import { Pipedrive } from '../../../pipedrive';
import { enrichPostalCodeValue } from './utils/enrichPostalCodeValue';
import { createHTMLTable } from '../../../../utils/createHTMLTable';

export type CreateLeadProps = {
  domain: string;
  contact: {
    salutation: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    postalCode?: string;
    city?: string;
  };
  appointmentRequests?: {
    location: string;
    duration: number;
    date: string;
  }[];
  questionnaireResults?: {
    question: string;
    answer: string;
  }[];
};

export const createLeadInCMS = async (data: CreateLeadProps) => {
  const landingPage = await Strapi.getLandingPageId(data.domain);
  const lead = await Strapi.createLead({ ...data, landingPage });
  return { lead };
};

export const createLeadInPipedrive = async (data: CreateLeadProps) => {
  const api = await Strapi.getPipedriveApi(data.domain);
  const token = api?.attributes?.api_token;
  if (!token) throw new Error('Missing Pipedrive token for domain.');

  if (data.contact.postalCode) {
    data.contact.postalCode = enrichPostalCodeValue({
      host: data.domain,
      contactData: data.contact,
    });
  }

  const person =
    (await Pipedrive.getPersonByEmail(token, data.contact.email ?? '')) ??
    (await Pipedrive.createPersonWithCustomPostalCodeField(token, {
      contactData: data.contact,
    }));

  const lead = await Pipedrive.createLead(token, {
    person_id: person.id,
    title: `${person.name} (${data.domain})`,
  });

  const content = data.questionnaireResults ?? data.appointmentRequests;

  if (!content) return { person, lead };

  const note = await Pipedrive.createNote(token, {
    lead_id: lead.id,
    content: createHTMLTable(content),
  });

  return { person, lead, note };
};
