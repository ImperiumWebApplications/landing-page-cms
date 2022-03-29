import {
  ContactFields,
  formFieldLabelConfiguration,
} from '../../config/form.config';

type RadioField = { type: 'radio'; value: string; options: string[] };
type TextField = { type: 'text'; label: string; value: string };
type EmailField = { type: 'email'; label: string; value: string };
type CheckboxField = { type: 'checkbox'; label: string; value: boolean };

export type FormField = RadioField | TextField | EmailField | CheckboxField;

export type CheckboxFields = {
  [ContactFields.TermsAccepted]: CheckboxField;
};

export type RadioFields = {
  [ContactFields.Salutation]: RadioField;
};

export type EmailFields = {
  [ContactFields.Email]: EmailField;
};

export type TextFields = {
  [ContactFields.FirstName]: TextField;
  [ContactFields.LastName]: TextField;
  [ContactFields.Phone]: TextField;
  [ContactFields.PostalCode]: TextField;
  [ContactFields.City]: TextField;
};

export type ContactData = CheckboxFields &
  RadioFields &
  EmailFields &
  TextFields;

export type QuestionnaireItem = {
  question: { id: number; value: string };
  answer: { id: number; value: string };
};

export type QuestionnaireContextState = {
  currentIndex: number;
  questionnaire: QuestionnaireItem[];
  contact: ContactData;
};

export const initialState: QuestionnaireContextState = {
  currentIndex: 0,
  questionnaire: [],
  contact: {
    [ContactFields.Salutation]: {
      type: 'radio',
      value: '',
      options: formFieldLabelConfiguration[ContactFields.Salutation],
    },
    [ContactFields.FirstName]: {
      type: 'text',
      label: formFieldLabelConfiguration[ContactFields.FirstName],
      value: '',
    },
    [ContactFields.LastName]: {
      type: 'text',
      label: formFieldLabelConfiguration[ContactFields.LastName],
      value: '',
    },
    [ContactFields.Email]: {
      type: 'email',
      label: formFieldLabelConfiguration[ContactFields.Email],
      value: '',
    },
    [ContactFields.Phone]: {
      type: 'text',
      label: formFieldLabelConfiguration[ContactFields.Phone],
      value: '',
    },
    [ContactFields.PostalCode]: {
      type: 'text',
      label: formFieldLabelConfiguration[ContactFields.PostalCode],
      value: '',
    },
    [ContactFields.City]: {
      type: 'text',
      label: formFieldLabelConfiguration[ContactFields.City],
      value: '',
    },
    [ContactFields.TermsAccepted]: {
      type: 'checkbox',
      label: formFieldLabelConfiguration[ContactFields.TermsAccepted],
      value: false,
    },
  },
};
