/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs';

// Next.js configuration
const moduleExports = {
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

// Sentry.io configuration
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
