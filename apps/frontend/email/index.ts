export enum EmailTemplate {
  'Confirmation' = 'Confirmation',
}

export const EmailSubject = {
  [EmailTemplate.Confirmation]: 'Vielen Dank für Ihre Anfrage!',
};

export interface EmailTemplatePayload {
  [EmailTemplate.Confirmation]: {
    questionnaire?: { question: string; answer: string }[];
    /** Date is ISO string, e.g. "2022-12-05T10:00:00.000Z" */
    appointments?: { date: string; location: string; duration: number }[];
  };
}

export interface EmailTemplateContext {
  [EmailTemplate.Confirmation]: {
    logoUrl?: string;
    email?: string;
    phone?: string;
    postalCode?: string;
    city?: string;
    firstName: string;
    lastName: string;
    colorPrimary: string;
    colorText: string;
  } & EmailTemplatePayload[EmailTemplate.Confirmation];
}
