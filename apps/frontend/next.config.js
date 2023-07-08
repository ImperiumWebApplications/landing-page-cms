/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

// Next.js configuration
const moduleExports = {
  // Swiper doesn't work with strict mode true
  // https://github.com/nolimits4web/swiper/issues/5398
  reactStrictMode: false,
  outputFileTracing: true,
  images: {
    domains: process.env.IMAGE_PROVIDER_URL
      ? [
          process.env.IMAGE_PROVIDER_URL,
        ]
      : [],
  },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
  sentry: {
    hideSourceMaps: false,
  },
};

// Sentry.io configuration
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
