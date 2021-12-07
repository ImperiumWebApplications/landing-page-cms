import axios from 'restyped-axios';

import { APIResponse, BackendAPI, LandingPageObjectList } from '../backend-api';
import { buildLandingPageQueryForDomain } from './query';

export const BACKEND_API = axios.create<BackendAPI>({
  baseURL: process.env.BACKEND_API,
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`,
  },
});

export const getLandingPageContentByDomain = async (domain: string) => {
  const queryString = buildLandingPageQueryForDomain(domain);
  const res = await BACKEND_API.get(`/landing-pages?${queryString}`);
  return isResponseOK(res) ? res.data.data[0].attributes : undefined;
};

const isResponseOK = (res: {
  status: number;
  data: APIResponse<LandingPageObjectList>;
}) => res.status >= 200 && res.status < 300 && res.data.data.length;
