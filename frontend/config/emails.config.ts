import { QuestionnaireItem } from '../context/Questionnaire/state';

export enum EmailTemplate {
  'Confirmation' = 'Confirmation',
}

export const EmailSubject = {
  [EmailTemplate.Confirmation]: 'Vielen Dank für Ihre Anfrage!',
};

export interface EmailTemplatePayload {
  [EmailTemplate.Confirmation]: { questionnaire: QuestionnaireItem[] };
}

export interface EmailTemplateContext {
  [EmailTemplate.Confirmation]: {
    logoUrl: string;
    firstName: string;
    lastName: string;
    colorPrimary: string;
    colorText: string;
  } & EmailTemplatePayload[EmailTemplate.Confirmation];
}
