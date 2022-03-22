import * as Sentry from '@sentry/nextjs';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String('Unknown error' + error);
};

export const captureNextAPIError = (error: unknown) => {
  const message = getErrorMessage(error);
  Sentry.captureException(error, {
    extra: { message },
    tags: { interface: 'NextAPI' },
  });
};
