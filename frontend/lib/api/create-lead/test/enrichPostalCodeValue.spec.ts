import type { ContactData } from '../../../../context/Questionnaire/state';

import { enrichPostalCodeValue } from '../utils/enrichPostalCodeValue';

const DEFAULT_CONTACT_DATA = {
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

describe('enrichPostalCodeValue', () => {
  it('should return code and city if city is given', () => {
    expect(
      enrichPostalCodeValue({
        host: 'craftsman24.de',
        contactData: DEFAULT_CONTACT_DATA,
      }),
    ).toEqual('22303 (Hamburg Winterhude)');
  });

  it('should return code and city if city is given and host is unknown', () => {
    expect(
      enrichPostalCodeValue({
        host: 'craftsman24.cc',
        contactData: DEFAULT_CONTACT_DATA,
      }),
    ).toEqual('22303 (Hamburg Winterhude)');
  });

  it('should return code and city if city is not given and host is known', () => {
    expect(
      enrichPostalCodeValue({
        host: 'craftsman24.de',
        contactData: {
          ...DEFAULT_CONTACT_DATA,
          city: {
            ...DEFAULT_CONTACT_DATA.city,
            value: '',
          },
        },
      }),
    ).toEqual('22303 (Hamburg Winterhude)');
  });
});
