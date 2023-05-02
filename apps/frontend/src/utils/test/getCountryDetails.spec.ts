import { Country } from '../../config/i18n.config';
import { getCountryDetails } from '../getCountryDetails';

describe('getCountryDetails', () => {
  it('should return empty list if no country was given', () => {
    expect(getCountryDetails()).toEqual([]);
    expect(getCountryDetails([])).toEqual([]);
  });

  it('should return empty list for unknown country', () => {
    expect(getCountryDetails(['CC'] as unknown as Country[])).toEqual([]);
  });

  it('should return details for known country', () => {
    expect(getCountryDetails(['CH'] as unknown as Country[])).toEqual([
      {
        isValidPostalCode: /(^\d{4}$)/,
        postalCodeLength: 4,
      },
    ]);
  });

  it('should return details for known country but nothing for unknown one', () => {
    expect(getCountryDetails(['CC', 'CH'] as unknown as Country[])).toEqual([
      {
        isValidPostalCode: /(^\d{4}$)/,
        postalCodeLength: 4,
      },
    ]);
  });
});
