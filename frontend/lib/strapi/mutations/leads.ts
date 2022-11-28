import type { Lead } from '../model/leads';
import { strapi } from '../instance';
import { CONTENT_TYPES } from '../model';

type CreateLeadMutation = {
  landingPage: number;
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
    date: Date;
  }[];
  questionnaireResults?: {
    question: string;
    answer: string;
  }[];
};

export const createLead = async (lead: CreateLeadMutation) => {
  const res = await strapi.create<Lead>(CONTENT_TYPES.LEADS, {
    landing_page: lead.landingPage,
    salutation: lead.contact.salutation,
    first_name: lead.contact.firstName,
    last_name: lead.contact.lastName,
    phone: lead.contact.phone,
    email: lead.contact.email,
    postal_code: lead.contact.postalCode,
    city: lead.contact.city,
    appointment_requests: lead.appointmentRequests?.map(
      ({ location, duration, date }) => {
        return { location, duration, proposed_date: date.toISOString() };
      },
    ),
    questionnaire_results: lead.questionnaireResults?.map(
      ({ question, answer }) => {
        return { question, answer };
      },
    ),
  } as Record<keyof Lead, unknown>);

  if (!res.data) {
    throw new Error(
      `Error while creating lead: ${(res as { error?: string })?.error}`,
    );
  }

  return res.data;
};
