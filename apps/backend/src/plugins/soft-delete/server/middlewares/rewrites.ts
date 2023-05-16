/**
 * This middleware rewrites the request to use the soft-delete controller.
 * This is a workaround since using the recommended beforeDelete lifecycle
 * hook does not prevent the relations from being deleted.
 */

export default (_, { strapi }) => {
  const config = strapi.config.get('plugin.soft-delete');
  if (!config?.models.length) return;

  return async (ctx, next) => {
    const model = getModelFromUrl(ctx.request.url);
    const isDelete = ctx.request.method === 'DELETE';

    // Turn the request into a PUT request with a deleted property
    if (model && config.models.includes(model) && isDelete) {
      ctx.request.method = 'PUT';
      ctx.request.body = { ...ctx.request.body, deleted: true };
    }

    // Rewrite the request to use the soft-delete controller
    if (
      model &&
      config.models.includes(model) &&
      ctx.request.method === 'POST' &&
      ctx.request.url.endsWith('/actions/bulkDelete')
    ) {
      ctx.request.url = '/soft-delete/softDelete';
      ctx.request.body = { model, ids: ctx.request.body.ids };
    }

    await next();
  };
};

const getModelFromUrl = (url: string) => {
  const match = url.match(/api::(.*?)\./);
  if (!match) return undefined;

  return match[1];
};
