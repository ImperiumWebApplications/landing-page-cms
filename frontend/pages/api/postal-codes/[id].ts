import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';

import * as PostalCodeJson from '../../../data/DE-postal-codes.json';
import { ErrorType, newServerError } from '../../../lib/api/error';
import { isPostalCodeFormat } from '../../../utils/isPostalCodeFormat';

export interface GetPostalCodeRequest extends NextApiRequest {
  query: {
    id?: string;
  };
}

export type GetPostalCodeResponse = NextApiResponse<{
  success: boolean;
  message?: string;
  data?: PostalCodeDetails;
}>;

export const handler = async (
  req: GetPostalCodeRequest,
  res: GetPostalCodeResponse,
) => {
  try {
    if (req.method !== 'GET')
      return newServerError(res, ErrorType.UNSUPPORTED_METHOD);

    const postalCode = req.query.id;
    if (!postalCode || !isPostalCodeFormat(postalCode))
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const postalCodeData =
      PostalCodeJson[postalCode as keyof typeof PostalCodeJson];

    if (!postalCodeData)
      return res.status(200).json({ success: true, data: undefined });

    return res.status(200).json({ success: true, data: postalCodeData });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'APIRoute' },
    });
    return res.status(500).json({ success: false });
  }
};

export default withSentry(handler);

type PostalCodeDetails = {
  code: string;
  city: string;
  community: string;
  state: string;
};
