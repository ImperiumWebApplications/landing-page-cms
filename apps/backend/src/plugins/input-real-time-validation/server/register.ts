'use strict';

export default ({ strapi }) => {
  strapi.customFields.register({
    name: 'input-real-time-validation',
    plugin: 'input-real-time-validation',
    type: 'string',
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};
