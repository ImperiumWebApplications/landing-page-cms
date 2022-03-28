import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { getPostalCodeDetails } from '../../lib/api/postal-codes';
import { captureNextAPIError, getErrorMessage } from '../../lib/api/error';
import { isPostalCodeFormat } from '../../utils/isPostalCodeFormat';
import { Country, PostalCodeDetails } from '../../config/countries.config';

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
    const { postalCode, country } = retrieveDataFromRequestBody(req);
    const postalCodeData = getPostalCodeDetails(postalCode, country);

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

const retrieveDataFromRequestBody = (req: NextApiRequest) => {
  try {
    if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

    if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE)
      throw new Error('Missing or invalid public API route query param.');

    const postalCode = req.body.code;
    const country = req.body.country
      ? (req.body.country as string).toUpperCase()
      : Country.Switzerland;

    if (!postalCode || !isPostalCodeFormat(postalCode, country))
      throw new Error('Missing or invalid postal code query param.');

    return { postalCode, country };
  } catch (error) {
    throw error;
  }
};
