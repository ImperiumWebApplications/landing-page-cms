import axios from 'restyped-axios';
import type { BackendAPI } from '../backend-api';

export const BACKEND_API = axios.create<BackendAPI>({
  baseURL: process.env.BACKEND_API,
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`,
  },
});

export const getLandingPageContentByDomain = async (domain: string) => {
  const res = await BACKEND_API.request({
    url: '/landing-pages',
    params: { 'filters[domain][$eq]': domain },
  });
  return isResponseOK(res) ? res.data.data[0] : undefined;
};

const isResponseOK = (res: { status: number; data: { data: any[] } }) =>
  res.status >= 200 && res.status < 300 && res.data.data.length;
