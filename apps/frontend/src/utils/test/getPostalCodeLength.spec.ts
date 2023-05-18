import { getPostalCodeLength } from '../getPostalCodeLength';

describe('getPostalCodeLength', () => {
  it('should return undefined if no countryDetails are given', () => {
    expect(getPostalCodeLength()).toEqual(undefined);
    expect(getPostalCodeLength([])).toEqual(undefined);
  });

  it('should return the length for a single given postal code', () => {
    expect(getPostalCodeLength([{ postalCodeLength: 6 }])).toEqual(6);
    expect(getPostalCodeLength([{ postalCodeLength: -1 }])).toEqual(undefined);
  });

  it('should return the minimum for multiple given postal codes', () => {
    expect(
      getPostalCodeLength([{ postalCodeLength: 6 }, { postalCodeLength: 4 }]),
    ).toEqual(4);
    expect(
      getPostalCodeLength([{ postalCodeLength: -1 }, { postalCodeLength: 2 }]),
    ).toEqual(2);
  });
});
