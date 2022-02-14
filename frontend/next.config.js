/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  outputFileTracing: true,
  images: {
    domains: process.env.IMAGE_PROVIDER_URL
      ? [process.env.IMAGE_PROVIDER_URL]
      : [],
  },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
  },
};
