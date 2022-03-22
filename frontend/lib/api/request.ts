import { CreateLeadInPipedriveProps } from './create-lead';
import type { SendMailProps } from './send-mail';

const sendMail = ({ host, template, recipient, payload }: SendMailProps) => {
  if (!host) return Promise.reject();

  const API_ROUTE = `/api/send-mail?PRIVATE_API_ROUTE=${
    process.env.PRIVATE_API_ROUTE ?? ''
  }`;

  const API =
    process.env.NODE_ENV === 'development'
      ? `http://${host}${API_ROUTE}`
      : `https://${host}${API_ROUTE}`;

  return fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ host, template, payload, recipient }),
  });
};

const getPostalCodeDetails = ({
  host,
  code,
}: {
  host?: string;
  code?: string | number;
}) => {
  if (!host || !code) return Promise.reject();

  const API_ROUTE = `/api/postal-codes/${code}?PRIVATE_API_ROUTE=${
    process.env.PRIVATE_API_ROUTE ?? ''
  }`;

  const API =
    process.env.NODE_ENV === 'development'
      ? `http://${host}${API_ROUTE}`
      : `https://${host}${API_ROUTE}`;

  return fetch(API, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};

const createLeadInPipedrive = ({
  host,
  contact,
  questionnaire,
}: CreateLeadInPipedriveProps) => {
  if (!host) return Promise.reject();

  const API_ROUTE = `/api/create-lead?API_ROUTE=${
    process.env.NEXT_PUBLIC_API_ROUTE ?? ''
  }`;

  const API =
    process.env.NODE_ENV === 'development'
      ? `http://${host}${API_ROUTE}`
      : `https://${host}${API_ROUTE}`;

  return fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionnaire, contact }),
  });
};

export const NextAPI = {
  sendMail,
  getPostalCodeDetails,
  createLeadInPipedrive,
};
