import { Strapi } from '@strapi/strapi';

import pluginId from '../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'multi-select-field',
    plugin: pluginId,
    type: 'json',
    // @ts-ignore
    inputSize: {
      default: 4,
      isResizable: true,
    },
  });
};
