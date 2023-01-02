export const ContactFieldConfig = {
  Salutation: {
    name: 'salutation',
    label: ['Frau', 'Herr'],
  },
  FirstName: {
    name: 'firstName',
    label: 'Vorname',
    validators: [
      { regex: /(.|\s)*\S(.|\s)*/, message: 'Bitte geben Sie einen Wert ein.' },
    ],
  },
  LastName: {
    name: 'lastName',
    label: 'Nachname',
    validators: [
      { regex: /(.|\s)*\S(.|\s)*/, message: 'Bitte geben Sie einen Wert ein.' },
    ],
  },
  Email: {
    name: 'email',
    label: 'E-Mail Adresse',
    validators: [
      {
        regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
        message: 'Bitte geben Sie eine gültige E-Mail Adresse ein.',
      },
    ],
  },
  Phone: {
    name: 'phone',
    label: 'Telefonnummer',
    validators: [
      {
        regex: /^[0-9+]{1,}[0-9-]{3,15}$/,
        message: 'Bitte geben Sie eine gültige Telefonnummer ein.',
      },
    ],
  },
  PostalCode: {
    name: 'postalCode',
    label: 'Postleitzahl',
    validators: [
      {
        regex: /^[0-9]*$/,
        message: 'Bitte geben Sie eine gültige Postleitzahl ein.',
      },
    ],
  },
  City: {
    name: 'city',
    label: 'Stadt',
  },
  TermsAccepted: {
    name: 'acceptedTerms',
    label:
      'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
  },
} as const;
