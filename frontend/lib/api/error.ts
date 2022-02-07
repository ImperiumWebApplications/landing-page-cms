/**
 * Server Error Configuration
 */

import { DefaultApiRouteResponse } from './response';

export enum ErrorType {
  'NOT_AUTHORIZED' = 'NOT_AUTHORIZED',
  'UNSUPPORTED_METHOD' = 'UNSUPPORTED_METHOD',
  'UNPROCESSABLE_ENTITY' = 'UNPROCESSABLE_ENTITY',
}

const ErrorResponse: { [key: string]: { status: number; message: string } } = {
  [ErrorType.NOT_AUTHORIZED]: {
    status: 401,
    message: 'Not authorized to access requested resource.',
  },
  [ErrorType.UNSUPPORTED_METHOD]: {
    status: 405,
    message: 'HTTP Method is not supported.',
  },
  [ErrorType.UNPROCESSABLE_ENTITY]: {
    status: 422,
    message: 'Insufficient or incompatible data provided.',
  },
};

export const newServerError = (
  res: DefaultApiRouteResponse,
  type: ErrorType,
) => {
  const { status, message } = ErrorResponse[type];
  return res.status(status).json({ success: false, message });
};
