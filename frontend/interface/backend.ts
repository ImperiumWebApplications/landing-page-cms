import qs from 'qs';
import axios from 'restyped-axios';
import * as Sentry from '@sentry/nextjs';

import type { BackendAPI } from '../backend-api';
import {
  isContentObjectListOK,
  isContentObjectOK,
} from '../utils/isResponseOK';

const BACKEND_API = axios.create<BackendAPI>({
  baseURL: process.env.BACKEND_API,
  headers: {
    Authorization:
      process.env.BACKEND_API_TOKEN !== undefined
        ? `Bearer ${process.env.BACKEND_API_TOKEN}`
        : '',
  },
});

/** Static Content Fetching */

const getStaticLandingPageContent = async () => {
  try {
    const res = await BACKEND_API.request({
      method: 'GET',
      url: '/static-content',
      params: { populate: '*' },
      paramsSerializer: (params) =>
        qs.stringify(params, { encodeValuesOnly: true }),
    });

    if (!isContentObjectOK(res))
      throw new Error('Static Landing Page Content is missing or malformed.');

    return res.data.data.attributes;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'StrapiAPI' },
    });
    return undefined;
  }
};

/** Dynamic Content Fetching */

const getLandingPageContentByDomain = async (domain: string) => {
  try {
    const res = await BACKEND_API.request({
      method: 'GET',
      url: '/landing-pages',
      params: {
        filters: { domain: { $eq: domain } },
        populate: {
          sections: {
            populate: {
              background_image: { populate: '*' },
              number: { populate: '*' },
              images: { populate: '*' },
              faq_item: { populate: '*' },
              rating: { populate: { avatar: { populate: '*' } } },
              service_tab: { populate: { service_images: { populate: '*' } } },
            },
          },
          logo_footer: { fields: '*' },
          logo_header: { fields: '*' },
          favicon: { fields: '*' },
          questionnaire: {
            fields: '*',
            populate: {
              advantage: { fields: '*' },
              questionnaires: { fields: '*', populate: ['icon'] },
            },
          },
        },
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { encodeValuesOnly: true }),
    });

    if (!isContentObjectListOK(res))
      throw new Error('Dynamic Landing Page Content is missing or malformed.');

    return res.data.data[0].attributes;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'StrapiAPI' },
    });
    return undefined;
  }
};

const getLandingPageStyleByDomain = async (domain: string) => {
  try {
    const res = await BACKEND_API.request({
      method: 'GET',
      url: '/landing-pages',
      params: {
        filters: { domain: { $eq: domain } },
        populate: {
          logo_header: { fields: '*' },
        },
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { encodeValuesOnly: true }),
    });

    if (!isContentObjectListOK(res))
      throw new Error('Landing Page Style Content is missing or malformed.');

    return res.data.data[0].attributes;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'StrapiAPI' },
    });
    return undefined;
  }
};

/** Questionnaire Fetching */

const getQuestionnaireContentById = async (id: string) => {
  try {
    const res = await BACKEND_API.request({
      method: 'GET',
      url: '/questionnaires',
      params: {
        filters: { id: { $eq: id } },
        populate: {
          icon: { populate: '*' },
          questions: {
            fields: '*',
            populate: {
              answers: { populate: '*' },
            },
          },
        },
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { encodeValuesOnly: true }),
    });

    if (!isContentObjectListOK(res))
      throw new Error('Questionnaire Content is missing or malformed.');

    return res.data.data[0].attributes;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'StrapiAPI' },
    });
    return undefined;
  }
};

/** Pipedrive API Token Fetching */

const getPipedriveAPITokenByDomain = async (domain: string) => {
  try {
    const res = await BACKEND_API.request({
      method: 'GET',
      url: '/pipedrive-apis',
      params: {
        filters: { landing_page: { domain: { $eq: domain } } },
        populate: '*',
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { encodeValuesOnly: true }),
    });

    if (!isContentObjectListOK(res))
      throw new Error('Pipedrive API Token Content is missing or malformed.');

    return res.data.data[0].attributes.api_token;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'StrapiAPI' },
    });
    return undefined;
  }
};

export const StrapiAPI = {
  getLandingPageContentByDomain,
  getLandingPageStyleByDomain,
  getStaticLandingPageContent,
  getQuestionnaireContentById,
  getPipedriveAPITokenByDomain,
};
