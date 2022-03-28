import {
  CountryDetails,
  isKnownCountry,
} from '../../../config/countries.config';

export const getPostalCodeDetails = (code: string, country: string) => {
  try {
    if (!isKnownCountry(country)) throw new Error('Unknown country provided.');

    const postalCodeDetails = CountryDetails[country].postalCodes.filter(
      (details) => details.zipcode === code,
    );

    if (!postalCodeDetails.length)
      throw new Error('Unknown postal code provided');

    return postalCodeDetails;
  } catch (error) {
    throw error;
  }
};
