import { isCountriesFormat } from '../utils/isCountriesFormat';

describe('isCountriesFormat', () => {
  it('should return false for missing countries array', () => {
    expect(isCountriesFormat(undefined)).toBeFalsy();
  });

  it('should return false for unsupported data type', () => {
    expect(isCountriesFormat('DE')).toBeFalsy();
    expect(isCountriesFormat([23])).toBeFalsy();
  });

  it('should return false for unknown country', () => {
    expect(isCountriesFormat(['CC'])).toBeFalsy();
    expect(isCountriesFormat(['DE', 'CC'])).toBeFalsy();
  });

  it('should return true for known countries array', () => {
    expect(isCountriesFormat(['CH'])).toBeTruthy();
    expect(isCountriesFormat(['DE', 'CH'])).toBeTruthy();
  });
});
