import qs from 'qs';
import axios from 'restyped-axios';

import {
  APIResponse,
  BackendAPI,
  LandingPageObjectList,
  StaticContentObject,
} from '../backend-api';

export const BACKEND_API = axios.create<BackendAPI>({
  baseURL: process.env.BACKEND_API,
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`,
  },
});

/** Static Content Fetching */

export const getStaticLandingPageContent = async () => {
  const res = await BACKEND_API.request({
    method: 'GET',
    url: '/static-content',
    params: { populate: '*' },
    paramsSerializer: (params) =>
      qs.stringify(params, { encodeValuesOnly: true }),
  });
  return isStaticContentOK(res) ? res.data.data.attributes : undefined;
};

const isStaticContentOK = (res: {
  status: number;
  data: APIResponse<StaticContentObject>;
}) => res.status >= 200 && res.status < 300 && res.data.data;

/** Dynamic Content Fetching */

export const getLandingPageContentByDomain = async (domain: string) => {
  const res = await BACKEND_API.request({
    method: 'GET',
    url: '/landing-pages',
    params: {
      filters: { domain: { $eq: domain } },
      populate: {
        sections: { populate: '*' },
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
  return isDynamicContentOK(res) ? res.data.data[0].attributes : undefined;
};

const isDynamicContentOK = (res: {
  status: number;
  data: APIResponse<LandingPageObjectList>;
}) => res.status >= 200 && res.status < 300 && res.data.data.length;
