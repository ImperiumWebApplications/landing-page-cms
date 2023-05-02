import type { Country } from '../../../../../config/countries.config';
import { isPostalCodeFormat } from '../utils/isPostalCodeFormat';

describe('isPostalCodeFormat', () => {
  it('should return false for missing countries', () => {
    const countries = [] as Country[];
    expect(isPostalCodeFormat(123, countries)).toBeFalsy();
  });

  it('should return true for correct German postal code', () => {
    const countries = ['DE'] as Country[];
    expect(isPostalCodeFormat('22303', countries)).toBeTruthy();
  });

  it('should return true for Swiss postal code, given many countries', () => {
    const countries = ['DE', 'CH'] as Country[];
    expect(isPostalCodeFormat('6300', countries)).toBeTruthy();
  });

  it('should return false for unknown postal code, given many countries', () => {
    const countries = ['DE', 'CH'] as Country[];
    expect(isPostalCodeFormat('630', countries)).toBeFalsy();
  });

  it('should return false for incorrect German postal code', () => {
    const countries = ['DE'] as Country[];
    expect(isPostalCodeFormat('2230', countries)).toBeFalsy();
  });

  it('should return false for unknown country', () => {
    const countries = ['CC'] as unknown as Country[];
    expect(isPostalCodeFormat(123, countries)).toBeFalsy();
  });

  it('should return true for code as number', () => {
    const countries = ['DE'] as Country[];
    expect(isPostalCodeFormat(22303, countries)).toBeTruthy();
  });
});
