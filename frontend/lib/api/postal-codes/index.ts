import * as PostalCodeJson from './data/DE-postal-codes.json';

export type PostalCodeDetails = {
  code: string;
  city: string;
  community: string;
  state: string;
};

export const getPostalCodeDetails = (code: string) => {
  try {
    const postalCodeData = (
      PostalCodeJson as Record<string, PostalCodeDetails | undefined>
    )[code];

    if (!postalCodeData) throw new Error('Unknown postal code provided');

    return postalCodeData;
  } catch (error) {
    throw error;
  }
};
