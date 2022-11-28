import type { PostalCodesRequest } from './validator';
import { isDevEnvironment } from '../../../../utils/isDevEnvironment';

export * from './postal-codes';
export * from './validator';

export const postalCodesFetcher = (data: PostalCodesRequest['body']) => {
  if (!data.code) return Promise.reject();

  const API_ROUTE = `/api/postal-codes?API_ROUTE=${
    process.env.NEXT_PUBLIC_API_ROUTE ?? ''
  }`;

  const API = isDevEnvironment(data.domain)
    ? `http://${data.domain}${API_ROUTE}`
    : `https://${data.domain}${API_ROUTE}`;

  return fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
