import { CountryDetails, isKnownCountry } from '../config/countries.config';

export const isPostalCodeFormat = (code: string | number, country?: string) => {
  if (!country || !isKnownCountry(country)) return true;

  if (typeof code === 'number') code = `${code}`;

  return CountryDetails[country].isValidPostalCode.test(code);
};
