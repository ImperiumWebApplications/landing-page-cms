import { QuestionnaireState } from '../context/Questionnaire';

export enum EmailTemplate {
  'Confirmation' = 'Confirmation',
}

export const EmailSubject = {
  [EmailTemplate.Confirmation]: 'Vielen Dank für Ihre Anfrage!',
};

export interface EmailTemplatePayload {
  [EmailTemplate.Confirmation]: {
    questionnaire: QuestionnaireState['questionnaire'];
  };
}

export interface EmailTemplateContext {
  [EmailTemplate.Confirmation]: {
    logoUrl?: string;
    phone?: string;
    postalCode?: string;
    firstName: string;
    lastName: string;
    colorPrimary: string;
    colorText: string;
  } & EmailTemplatePayload[EmailTemplate.Confirmation];
}
