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

    async beforeDelete(event) {
      await strapi.db.query(event.model.uid).update({
        where: { ...event.params.where },
        data: { deleted: true },
      });
      event.params.where = { id: null };
    },

    async beforeDeleteMany(event) {
      await strapi.db.query(event.model.uid).updateMany({
        where: { ...event.params.where },
        data: { deleted: true },
      });
      event.params.where = { id: null };
    },
  });
};
