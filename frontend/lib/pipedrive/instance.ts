import axios from 'axios';

const PIPEDRIVE_API_URL = 'https://api.pipedrive.com/v1';

export const instance = axios.create({
  baseURL: PIPEDRIVE_API_URL,
});
