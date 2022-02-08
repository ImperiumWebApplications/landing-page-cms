import { CreateLeadRequestBody } from '../../pages/api/create-lead';
import { SendMailRequestBody } from '../../pages/api/send-mail';

const sendMail = ({
  domain,
  template,
  recipient,
  payload,
}: SendMailRequestBody) => {
  if (!domain) return Promise.reject();

  const API_ROUTE = `api/send-mail?PRIVATE_API_ROUTE=${
    process.env.PRIVATE_API_ROUTE ?? ''
  }`;

  const API =
    process.env.NODE_ENV === 'development'
      ? `http://${domain}/${API_ROUTE}`
      : `https://${domain}/${API_ROUTE}`;

  return fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, template, payload, recipient }),
  });
};

const createLead = ({
  domain,
  contact,
  questionnaire,
}: CreateLeadRequestBody) => {
  if (!domain) return Promise.reject();

  const API_ROUTE = `/api/create-lead?API_ROUTE=${
    process.env.NEXT_PUBLIC_API_ROUTE ?? ''
  }`;

  const API =
    process.env.NODE_ENV === 'development'
      ? `http://${domain}/${API_ROUTE}`
      : `https://${domain}/${API_ROUTE}`;

  return fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionnaire, contact }),
  });
};

export const NextAPI = {
  sendMail,
  createLead,
};
