import {
  Country,
  isKnownCountry,
} from '../../../../../config/countries.config';

export const isCountriesFormat = (
  countries: unknown,
): countries is Country[] => {
  if (!countries || !(countries instanceof Array)) return false;
  return !countries.some((country) => !isKnownCountry(country));
};
