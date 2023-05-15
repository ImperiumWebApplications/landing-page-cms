import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  getModelsWithSoftDelete() {
    return {
      models: strapi.config.get('plugin.soft-delete').models ?? [],
    };
  },
});
