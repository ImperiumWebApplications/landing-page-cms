import {
  Country,
  CountryPostalCodes,
  PostalCodeDetails,
} from '../../../config/countries.config';

/**
 * Search for a given postal code in all given countries.
 * And return accumulated search results for all countries.
 * @param countries: Country[]
 * @param code: string
 * @returns PostalCodeDetails[]
 */

export const getPostalCodeDetails = (code: string, countries: Country[]) => {
  try {
    return countries.reduce((prev, countryCode) => {
      try {
        const details = CountryPostalCodes[countryCode].filter(
          (details) => details.zipcode === code,
        );
        return [...prev, ...details];
      } catch (error) {
        return prev;
      }
    }, [] as PostalCodeDetails[]);
  } catch (error) {
    throw error;
  }
};
