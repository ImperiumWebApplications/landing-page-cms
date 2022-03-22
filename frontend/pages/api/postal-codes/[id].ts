import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import {
  getPostalCodeDetails,
  PostalCodeDetails,
} from '../../../lib/api/postal-codes';
import { captureNextAPIError } from '../../../lib/api/error';
import { isPostalCodeFormat } from '../../../utils/isPostalCodeFormat';

export type GetPostalCodeResponse = NextApiResponse<{
  success: boolean;
  data?: PostalCodeDetails;
}>;

export const handler = async (
  req: NextApiRequest,
  res: GetPostalCodeResponse,
) => {
  try {
    const { postalCode } = retrieveDataFromRequest(req);
    const postalCodeData = getPostalCodeDetails(postalCode);

    return res.status(200).json({ success: true, data: postalCodeData });
  } catch (error) {
    captureNextAPIError(error);
    return res.status(500).json({ success: false });
  }
};

export default withSentry(handler);

/**
 *
 * HELPER FUNCTIONS
 *
 */

const retrieveDataFromRequest = (req: NextApiRequest) => {
  try {
    if (req.method !== 'GET') throw new Error('Unsupported HTTP method.');

    if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE)
      throw new Error('Missing or invalid public API route query param.');

    const postalCode = req.query.id.toString();
    if (!postalCode || !isPostalCodeFormat(postalCode))
      throw new Error('Missing or invalid postal code query param.');

    return { postalCode };
  } catch (error) {
    throw error;
  }
};
