'use strict';

export default ({ strapi }) => {
  strapi.customFields.register({
    name: 'construction-mode',
    plugin: 'construction-mode',
    type: 'boolean',
  });
};
