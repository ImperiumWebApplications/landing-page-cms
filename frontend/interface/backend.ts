import qs from 'qs';
import axios from 'restyped-axios';

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
  const res = await BACKEND_API.request({
    method: 'GET',
    url: '/static-content',
    params: { populate: '*' },
    paramsSerializer: (params) =>
      qs.stringify(params, { encodeValuesOnly: true }),
  });
  return isContentObjectOK(res) ? res.data.data.attributes : undefined;
};

/** Dynamic Content Fetching */

const getLandingPageContentByDomain = async (domain: string) => {
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
  return isContentObjectListOK(res) ? res.data.data[0].attributes : undefined;
};

const getLandingPageStyleByDomain = async (domain: string) => {
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
  return isContentObjectListOK(res) ? res.data.data[0].attributes : undefined;
};

/** Questionnaire Fetching */

const getQuestionnaireContentById = async (id: string) => {
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
  return isContentObjectListOK(res) ? res.data.data[0].attributes : undefined;
};

/** Pipedrive API Token Fetching */

const getPipedriveAPITokenByDomain = async (domain: string) => {
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
  return isContentObjectListOK(res)
    ? res.data.data[0].attributes.api_token
    : undefined;
};

export const StrapiAPI = {
  getLandingPageContentByDomain,
  getLandingPageStyleByDomain,
  getStaticLandingPageContent,
  getQuestionnaireContentById,
  getPipedriveAPITokenByDomain,
};
