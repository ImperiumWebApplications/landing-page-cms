import { isDevEnvironment } from '../../../../utils/isDevEnvironment';
import { CreateLeadRequest } from './validator';

export * from './create-lead';
export * from './validator';

export const createLeadFetcher = (data: CreateLeadRequest['body']) => {
  if (!data.domain) return Promise.reject();

  const API_ROUTE = `/api/create-lead?API_ROUTE=${
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
