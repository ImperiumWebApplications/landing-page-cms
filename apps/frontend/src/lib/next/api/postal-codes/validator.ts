import type { NextApiRequest } from 'next';

import type { GetPostalCodeDetailsProps } from './postal-codes';
import { isCountriesFormat } from './utils/isCountriesFormat';
import { isPostalCodeFormat } from './utils/isPostalCodeFormat';

export interface PostalCodesRequest extends NextApiRequest {
  body: {
    domain: string;
    code?: string | number;
    countries?: string[];
  };
}

export const validateRequestBody = (
  req: NextApiRequest,
): GetPostalCodeDetailsProps => {
  try {
    if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

    if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE)
      throw new Error('Missing or invalid public API route query param.');

    const postalCode = req.body.code;
    const countries = req.body.countries;

    if (!isCountriesFormat(countries))
      throw new Error('Missing or invalid list of countries provided.');

    if (!postalCode || !isPostalCodeFormat(postalCode, countries))
      throw new Error('Missing or invalid postal code query param.');

    return { code: postalCode.toString(), countries };
  } catch (error) {
    throw error;
  }
};
