import { isDeletedTrueFilter } from '../utils/isDeleted';

export const applySoftDeleteSubscribers = ({ strapi }: { strapi: any }) => {
  const config = strapi.config.get('plugin.soft-delete');
  if (!config?.models.length) return;

  strapi.db.lifecycles.subscribe({
    models: config.models.map((model) => `api::${model}.${model}`),

    async beforeFindMany(event) {
      // Don't hide deleted items if explicitly requested in query
      if (isDeletedTrueFilter(event)) return;

      event.params.where = {
        ...event.params.where,
        $or: [{ deleted: false }, { deleted: null }],
      };
    },
  });
};
