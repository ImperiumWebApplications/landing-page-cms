import type { NextApiRequest, NextApiResponse } from 'next';

import { captureNextAPIError, getErrorMessage } from '../../lib/next/api/error';
import {
  getRelatedServiceTypes,
  RelatedServiceTypes,
  validateRequestBody,
} from '../../lib/next/api/service-types';

export type ServiceTypesResponse = NextApiResponse<{
  success: boolean;
  message?: string;
  data?: RelatedServiceTypes;
}>;

export const handler = async (
  req: NextApiRequest,
  res: ServiceTypesResponse,
) => {
  try {
    const { questionnaireId } = validateRequestBody(req);
    const data = await getRelatedServiceTypes({ questionnaireId });

    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .status(200)
      .json({ success: true, data });
  } catch (error) {
    captureNextAPIError(error);
    const message = getErrorMessage(error);
    res.status(500).json({ success: false, message });
  }
};

export default handler;
