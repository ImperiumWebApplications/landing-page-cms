import { strapi } from '../instance';
import { CONTENT_TYPES, SingleType, StaticContent } from '../model';

export const getStaticContent = async () => {
  const res = await strapi.find<SingleType<StaticContent>>(
    CONTENT_TYPES.STATIC_CONTENT,
    {
      populate: '*',
    },
  );

  if (!res.data.attributes) throw new Error('No static content found');

  return res.data;
};
