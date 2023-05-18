import { strapi } from '../instance';
import { CONTENT_TYPES, CollectionType, Questionnaire } from '../model';

export const getQuestionnaire = async (id: string) => {
  const res = await strapi.find<CollectionType<Questionnaire>>(
    CONTENT_TYPES.QUESTIONNAIRES,
    {
      filters: { id: { $eq: id } },
      populate: {
        icon: { populate: '*' },
        questions: {
          fields: '*',
          populate: {
            answers: { populate: '*' },
          },
        },
      },
    },
  );

  if (!res.data.length) throw new Error('No questionnaire found for id: ' + id);

  return res.data[0];
};
