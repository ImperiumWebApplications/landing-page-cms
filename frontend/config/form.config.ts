export type Validator = {
  regex: RegExp;
  message: string;
};

export const formFieldLabelConfiguration = {
  salutation: ['Frau', 'Herr'],
  firstName: 'Vorname',
  lastName: 'Nachname',
  email: 'E-Mail Adresse',
  phone: 'Telefonnummer',
  postalCode: 'Postleitzahl',
  acceptedTerms:
    'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
};

// Add specific validators for a given field.
// By default, each field has a check for being non-empty.
export const formFieldValidations: { [key: string]: Validator[] } = {
  salutation: [],
  firstName: [],
  lastName: [],
  email: [
    {
      regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
      message: 'Bitte geben Sie eine gültige E-Mail Adresse ein.',
    },
  ],
  phone: [
    {
      regex: /^[0-9+]{1,}[0-9-]{3,15}$/,
      message: 'Bitte geben Sie eine gültige Telefonnummer ein.',
    },
  ],
  postalCode: [
    {
      regex: /^\d{4,5}$/gm,
      message: 'Bitte geben Sie eine gültige Postleitzahl ein.',
    },
  ],
  acceptedTerms: [],
};
