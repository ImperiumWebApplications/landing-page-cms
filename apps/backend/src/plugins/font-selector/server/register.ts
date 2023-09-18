'use strict';

export default ({ strapi }) => {
  strapi.customFields.register({
    name: 'font-selector',
    plugin: 'font-selector',
    type: 'string',
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};
