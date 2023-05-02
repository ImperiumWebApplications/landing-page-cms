/**
 * Checks if the given postal code matches the local
 * postal code format in any of the given countries.
 * @param code: string | number
 * @param countries?: string[]
 * @returns boolean;
 */

import {
  CountryDetails,
  isKnownCountry,
} from '../../../../../config/i18n.config';

export const isPostalCodeFormat = (
  code: string | number,
  countries?: string[],
): code is string | number => {
  if (!countries || !countries.length) return false;

  let isValid = false;

  countries.forEach((country) => {
    if (!isKnownCountry(country)) return;
    if (typeof code === 'number') code = `${code}`;
    isValid = CountryDetails[country].isValidPostalCode.test(code);
  });

  return isValid;
};
