'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config

  // Needed to expose the environment variables to the client
  config.plugins.push(
    // service-type-column needs this
    new webpack.EnvironmentPlugin(['ADMIN_CLIENT_JWT_TOKEN']),
  );

  // Important: return the modified config
  return config;
};
