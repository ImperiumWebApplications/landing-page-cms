import { formFieldLabelConfiguration } from '../../config/form.config';

type RadioField = { type: 'radio'; value: string; options: string[] };
type TextField = { type: 'text'; label: string; value: string };
type EmailField = { type: 'email'; label: string; value: string };
type CheckboxField = { type: 'checkbox'; label: string; value: boolean };

export type CheckboxFieldKey = Extract<keyof ContactData, 'acceptedTerms'>;
export type RadioFieldKey = Extract<keyof ContactData, 'salutation'>;
export type TextFieldKey = Exclude<
  keyof ContactData,
  'salutation' | 'acceptedTerms'
>;

export type ContactData = {
  salutation: RadioField;
  firstName: TextField;
  lastName: TextField;
  email: EmailField;
  phone: TextField;
  postalCode: TextField;
  acceptedTerms: CheckboxField;
};

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
    salutation: {
      type: 'radio',
      value: '',
      options: formFieldLabelConfiguration.salutation,
    },
    firstName: {
      type: 'text',
      label: formFieldLabelConfiguration.firstName,
      value: '',
    },
    lastName: {
      type: 'text',
      label: formFieldLabelConfiguration.lastName,
      value: '',
    },
    email: {
      type: 'email',
      label: formFieldLabelConfiguration.email,
      value: '',
    },
    phone: {
      type: 'text',
      label: formFieldLabelConfiguration.phone,
      value: '',
    },
    postalCode: {
      type: 'text',
      label: formFieldLabelConfiguration.postalCode,
      value: '',
    },
    acceptedTerms: {
      type: 'checkbox',
      label: formFieldLabelConfiguration.acceptedTerms,
      value: false,
    },
  },
};
