import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { getPostalCodeDetails } from '../../lib/next/api/postal-codes';
import { captureNextAPIError, getErrorMessage } from '../../lib/next/api/error';
import { isPostalCodeFormat } from '../../utils/isPostalCodeFormat';
import { isCountriesFormat } from '../../utils/isCountriesFormat';
import { PostalCodeDetails } from '../../config/countries.config';

export type GetPostalCodeResponse = NextApiResponse<{
  success: boolean;
  message?: string;
  data?: PostalCodeDetails[];
}>;

export const handler = async (
  req: NextApiRequest,
  res: GetPostalCodeResponse,
) => {
  try {
    const { postalCode, countries } = retrieveDataFromRequestBody(req);
    const postalCodeData = getPostalCodeDetails(postalCode, countries);

    return res.status(200).json({ success: true, data: postalCodeData });
  } catch (error) {
    captureNextAPIError(error);
    const message = getErrorMessage(error);
    return res.status(500).json({ success: false, message });
  }
};

export default withSentry(handler);

/**
 *
 * HELPER FUNCTIONS
 *
 */

export const retrieveDataFromRequestBody = (req: NextApiRequest) => {
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

    return { postalCode: postalCode.toString(), countries };
  } catch (error) {
    throw error;
  }
};
