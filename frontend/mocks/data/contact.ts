import { ContactData } from '../../context/Questionnaire/state';

export const contactDataMock = {
  salutation: {
    type: 'radio',
    value: 'Frau',
    options: ['Frau', 'Herr'],
  },
  firstName: {
    type: 'text',
    label: 'Vorname',
    value: 'first name',
  },
  lastName: {
    type: 'text',
    label: 'Nachname',
    value: 'last name',
  },
  email: {
    type: 'email',
    label: 'E-Mail Adresse',
    value: 'test@test.de',
  },
  phone: {
    type: 'text',
    label: 'Telefonnummer',
    value: '1234567890',
  },
  postalCode: {
    type: 'text',
    label: 'Postleitzahl',
    value: '22303',
  },
  city: {
    type: 'text',
    label: 'Stadt',
    value: 'Hamburg Winterhude',
  },
  acceptedTerms: {
    type: 'checkbox',
    label:
      'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
    value: true,
  },
} as ContactData;
