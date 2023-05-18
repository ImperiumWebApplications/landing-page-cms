import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('soft-delete')
      .service('softDelete')
      .softDeleteMany(ctx.request.body.model, ctx.request.body.ids);
  },
});
