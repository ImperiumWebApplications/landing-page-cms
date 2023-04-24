'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config

  config.plugins.push(
    new webpack.DefinePlugin({
      CUSTOM_VARIABLES: {
        ADMIN_CLIENT_JWT_TOKEN: JSON.stringify(
          process.env.ADMIN_CLIENT_JWT_TOKEN,
        ),
      },
    }),
  );

  // Important: return the modified config
  return config;
};
