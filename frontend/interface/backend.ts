import axios from 'restyped-axios';
import type { BackendAPI } from '../backend-api';

export const BACKEND_API = axios.create<BackendAPI>({
  baseURL: process.env.BACKEND_API,
});

export const getLandingPageContentByDomain = async (domain: string) => {
  const res = await BACKEND_API.request({ url: '/landing-pages', params: { domain } });
  return res.status >= 200 && res.status < 300 && res.data.length ? res.data[0] : undefined;
};
