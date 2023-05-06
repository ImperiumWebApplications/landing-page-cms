import {
  isKnownCountry,
  PostalCodeDetails,
} from '../../../../config/countries.config';
import { CountryPostalCodes } from './data';

export type GetPostalCodeDetailsProps = {
  code: string;
  countries: string[];
};

/**
 * Search for a given postal code in all given countries.
 * And return accumulated search results for all countries.
 * @param countries: Country[]
 * @param code: string
 * @returns PostalCodeDetails[]
 */

export const getPostalCodeDetails = ({
  code,
  countries,
}: GetPostalCodeDetailsProps) => {
  return countries.reduce((prev, countryCode) => {
    try {
      if (!isKnownCountry(countryCode)) return prev;
      const details = (
        CountryPostalCodes[countryCode] as PostalCodeDetails[]
      ).filter((details) => details.code === code);
      return [...prev, ...details];
    } catch (error) {
      return prev;
    }
  }, [] as PostalCodeDetails[]);
};
