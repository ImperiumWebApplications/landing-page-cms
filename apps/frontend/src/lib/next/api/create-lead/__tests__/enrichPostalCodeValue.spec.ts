import { contactDataMock } from '../../../../../../mocks/questionnaire/data';
import { enrichPostalCodeValue } from '../utils/enrichPostalCodeValue';

describe('enrichPostalCodeValue', () => {
  it('should return code and city if city is given', () => {
    expect(
      enrichPostalCodeValue({
        countries: ['DE'],
        contactData: contactDataMock,
      }),
    ).toEqual('22303 Hamburg Winterhude');
  });

  it('should return code and city if city is given and host is unknown', () => {
    expect(
      enrichPostalCodeValue({
        countries: undefined,
        contactData: contactDataMock,
      }),
    ).toEqual('22303 Hamburg Winterhude');
  });

  it('should return code and city if city is not given and host is known', () => {
    expect(
      enrichPostalCodeValue({
        countries: ['DE'],
        contactData: {
          ...contactDataMock,
          city: '',
        },
      }),
    ).toEqual('22303 Hamburg Winterhude');
  });
});
