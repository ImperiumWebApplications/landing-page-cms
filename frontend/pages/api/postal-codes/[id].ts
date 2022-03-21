import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';

import * as PostalCodeJson from '../../../data/DE-postal-codes.json';
import { ErrorType, newServerError } from '../../../lib/api/error';
import { isPostalCodeFormat } from '../../../utils/isPostalCodeFormat';

export interface GetPostalCodeRequest extends NextApiRequest {
  query: {
    id?: string;
    PRIVATE_API_ROUTE?: string;
  };
}

export type PostalCodeDetails = {
  code: string;
  city: string;
  community: string;
  state: string;
};

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
    const { data, error } = retrieveDataFromRequest(req);
    if (!data) return newServerError(res, error);

    const postalCodeData =
      PostalCodeJson[data.postalCode as keyof typeof PostalCodeJson];

    return res
      .status(200)
      .json({ success: true, data: postalCodeData ?? undefined });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'APIRoute' },
    });
    return res.status(500).json({ success: false });
  }
};

export default withSentry(handler);

/**
 *
 * HELPER FUNCTIONS
 *
 */

export const retrieveDataFromRequest = (req: GetPostalCodeRequest) => {
  if (req.method !== 'GET')
    return { data: undefined, error: ErrorType.UNSUPPORTED_METHOD };

  if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE) {
    Sentry.captureMessage('Missing or invalid public API route query param.', {
      level: Sentry.Severity.Error,
      tags: { interface: 'APIRoute' },
    });
    return { data: undefined, error: ErrorType.NOT_AUTHORIZED };
  }

  const postalCode = req.query.id;
  if (!postalCode || !isPostalCodeFormat(postalCode))
    return { data: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };

  return { data: { postalCode }, error: undefined };
};
