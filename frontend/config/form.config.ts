export const ContactFields = {
  Salutation: 'salutation',
  FirstName: 'firstName',
  LastName: 'lastName',
  Email: 'email',
  Phone: 'phone',
  PostalCode: 'postalCode',
  City: 'city',
  TermsAccepted: 'acceptedTerms',
} as const;

export const ContactFieldLabelMap = {
  [ContactFields.Salutation]: ['Frau', 'Herr'],
  [ContactFields.FirstName]: 'Vorname',
  [ContactFields.LastName]: 'Nachname',
  [ContactFields.Email]: 'E-Mail Adresse',
  [ContactFields.Phone]: 'Telefonnummer',
  [ContactFields.PostalCode]: 'Postleitzahl',
  [ContactFields.City]: 'Stadt',
  [ContactFields.TermsAccepted]:
    'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
} as const;

export const ContactFieldValidations: {
  [key: string]: Validator[];
} = {
  [ContactFields.Salutation]: [],
  [ContactFields.FirstName]: [],
  [ContactFields.LastName]: [],
  [ContactFields.City]: [],
  [ContactFields.TermsAccepted]: [],
  [ContactFields.Email]: [
    {
      regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
      message: 'Bitte geben Sie eine gültige E-Mail Adresse ein.',
    },
  ],
  [ContactFields.Phone]: [
    {
      regex: /^[0-9+]{1,}[0-9-]{3,15}$/,
      message: 'Bitte geben Sie eine gültige Telefonnummer ein.',
    },
  ],
  [ContactFields.PostalCode]: [
    {
      regex: /^[0-9]*$/,
      message: 'Bitte geben Sie eine gültige Postleitzahl ein.',
    },
  ],
};

export type Validator = {
  regex: RegExp;
  message: string;
};
