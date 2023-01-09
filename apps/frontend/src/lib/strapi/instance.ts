import Strapi from 'strapi-sdk-js';

export const strapi = new Strapi({
  url: process.env.BACKEND_API ?? 'http://localhost:1337',
  prefix: '/api',
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`,
    },
  },
});
