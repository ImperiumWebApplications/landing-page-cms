import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getPostalCodeDetails,
  validateRequestBody,
} from '../../lib/next/api/postal-codes';
import { captureNextAPIError, getErrorMessage } from '../../lib/next/api/error';
import type { PostalCodeDetails } from '../../config/countries.config';

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
    const { code, countries } = validateRequestBody(req);
    const postalCodeData = getPostalCodeDetails({ code, countries });

    res.status(200).json({ success: true, data: postalCodeData });
  } catch (error) {
    captureNextAPIError(error);
    const message = getErrorMessage(error);
    res.status(500).json({ success: false, message });
  }
};

export default handler;
