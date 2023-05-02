import { strapi } from '../instance';
import { CONTENT_TYPES, SingleType, StaticContent } from '../model';

type StaticContentLocale = 'German' | 'English';
type GetStaticContentProps = {
  locale?: StaticContentLocale | null;
};

export const getStaticContent = async ({
  locale,
}: GetStaticContentProps = {}) => {
  const res = await strapi.find<SingleType<StaticContent>>(
    CONTENT_TYPES.STATIC_CONTENT,
    {
      locale: getStrapiLocale(locale),
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
            navigation_item: { fields: '*' },
          },
        },
        services_section: {
          fields: '*',
          populate: {
            navigation_item: { fields: '*' },
            process_navigation_item: { fields: '*' },
            process_step: { fields: '*', populate: { icon: { fields: '*' } } },
            process_advantage: { fields: '*' },
          },
        },
        reviews_section: {
          fields: '*',
          populate: {
            navigation_item: { fields: '*' },
          },
        },
        questions_section: {
          fields: '*',
          populate: {
            navigation_item: { fields: '*' },
          },
        },
      },
    },
  );

  if (!res.data.attributes) throw new Error('No static content found');

  return res.data;
};

const getStrapiLocale = (locale?: StaticContentLocale | null) => {
  switch (locale) {
    case 'German':
      return 'de';
    case 'English':
      return 'en';
    default:
      return 'de';
  }
};
