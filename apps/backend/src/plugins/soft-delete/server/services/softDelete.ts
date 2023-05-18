import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async softDeleteMany(model: string, ids: string[]) {
    await strapi.db.query(`api::${model}.${model}`).updateMany({
      where: {
        id: {
          $in: ids,
        },
      },
      data: { deleted: true },
    });
  },
});
