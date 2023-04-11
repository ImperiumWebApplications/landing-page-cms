import { strapi } from '../instance';
import { CONTENT_TYPES, SingleType, StaticContent } from '../model';

export const getStaticContent = async () => {
  const res = await strapi.find<SingleType<StaticContent>>(
    CONTENT_TYPES.STATIC_CONTENT,
    {
      populate: {
        hero_section: {
          fields: '*',
          populate: {
            hero_advantage: {
              fields: '*',
              populate: { icon: { fields: '*' } },
            },
          },
        },
        video_section: {
          fields: '*',
          populate: {
            video: { fields: '*' },
            video_thumbnail: { fields: '*' },
          },
        },
        services_section: {
          fields: '*',
          populate: {
            process_step: { fields: '*', populate: { icon: { fields: '*' } } },
            process_advantage: { fields: '*' },
          },
        },
        reviews_section: {
          fields: '*',
        },
        questions_section: {
          fields: '*',
        },
      },
    },
  );

  if (!res.data.attributes) throw new Error('No static content found');

  return res.data;
};
