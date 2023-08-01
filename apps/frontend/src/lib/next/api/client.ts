import { isDevEnvironment } from '../../../utils/isDevEnvironment';
import { TextField } from '../../strapi';

import type { CreateLeadRequest } from './create-lead';
import type { PostalCodesRequest } from './postal-codes';
import type { SendMailRequest } from './send-mail';

interface GetStatesNamesRequest {
  country: string;
}

export const NextAPI = {
  createLead: (data: CreateLeadRequest['body']) => {
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
  },
  createLeadInOdoo: (data: CreateLeadRequest['body'], companyId: TextField) => {
    const domain = data.domain;
    const questionnaireResults = data.questionnaireResults;
    if (!domain) {
      return Promise.reject(new Error('Domain is not provided'));
    }

    const API_ROUTE = `/api/odoo-leads`;

    const API = isDevEnvironment(domain)
      ? `http://${domain}${API_ROUTE}`
      : `https://${domain}${API_ROUTE}`;

    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        company_id: companyId,
        questionnaireResults,
      }),
    });
  },
  getPostalCodeDetails: (data: PostalCodesRequest['body']) => {
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
  },

  getStatesNames(data: GetStatesNamesRequest): Promise<Response> {
    if (!data.country)
      return Promise.reject(new Error('Country is not provided'));

    const API_ROUTE = `/api/states/${data.country}`;
    const API = `${window.location.protocol}//${window.location.host}${API_ROUTE}`;

    return fetch(API, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  },

  sendMail: (data: SendMailRequest['body']) => {
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
  },
};
