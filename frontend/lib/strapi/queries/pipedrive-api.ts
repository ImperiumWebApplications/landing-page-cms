import { strapi } from '../instance';
import { CollectionType, CONTENT_TYPES, PipedriveApi } from '../model';

export const getPipedriveApi = async (domain: string) => {
  const res = await strapi.find<CollectionType<PipedriveApi>>(
    CONTENT_TYPES.PIPEDRIVE_APIS,
    {
      filters: { landing_page: { domain: { $eq: domain } } },
      populate: '*',
    },
  );

  if (!res.data.length)
    throw new Error('No pipedrive api found for domain: ' + domain);

  return res.data[0];
};
