import type { SendMailRequest } from './validator';
import { isDevEnvironment } from '../../../../utils/isDevEnvironment';

export * from './send-mail';
export * from './validator';

export const sendMailFetcher = (data: SendMailRequest['body']) => {
  if (!data.domain) return Promise.reject();

  const API_ROUTE = `/api/send-mail?PRIVATE_API_ROUTE=${
    process.env.PRIVATE_API_ROUTE ?? ''
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
