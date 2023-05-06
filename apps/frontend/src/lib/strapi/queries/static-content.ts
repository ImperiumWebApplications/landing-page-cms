import { strapi } from '../instance';
import {
  CONTENT_TYPES,
  LandingPageLanguage,
  SingleType,
  StaticContent,
} from '../model';
import { getLanguageLocale } from '../utils/getLanguageLocale';

export const getStaticContent = async (
  language?: LandingPageLanguage | null,
) => {
  const res = await strapi.find<SingleType<StaticContent>>(
    CONTENT_TYPES.STATIC_CONTENT,
    {
      locale: getLanguageLocale(language),
      populate: {
        footer: {
          fields: '*',
          populate: {
            links: { fields: '*' },
          },
        },
        questionnaire: {
          field: '*',
          populate: {
            contact_details_badges: { fields: '*' },
          },
        },
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
