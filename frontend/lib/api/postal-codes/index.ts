import {
  Country,
  CountryPostalCodes,
  isKnownCountry,
  PostalCodeDetails,
} from '../../../config/countries.config';

export const getPostalCodeDetails = (code: string, country: string) => {
  try {
    if (!isKnownCountry(country)) throw new Error('Unknown country provided.');

    const details = CountryPostalCodes[country].filter(
      (details) => details.zipcode === code,
    );

    if (!details.length) throw new Error('Unknown postal code provided');

    return details;
  } catch (error) {
    throw error;
  }
};

/**
 * Search for a given postal code in all given countries.
 * And return accumulated search results for all countries.
 * @param countries: Country[]
 * @param code: string
 * @returns PostalCodeDetails[]
 */

export const getPostalCodeDetailsFromAllCountries = (
  countries: Country[],
  code: string,
) => {
  return countries.reduce((prev, countryCode) => {
    try {
      const details = getPostalCodeDetails(code, countryCode);
      return [...prev, ...details];
    } catch (error) {
      return prev;
    }
  }, [] as PostalCodeDetails[]);
};
