import { Strapi } from '../../../strapi';

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
