import qs from 'qs';

export const buildLandingPageQueryForDomain = (domain: string) => {
  return qs.stringify(
    {
      filters: { domain: { $eq: domain } },
      populate: {
        sections: { populate: '*' },
        logo_footer: { fields: '*' },
        logo_header: { fields: '*' },
        favicon: { fields: '*' },
        questionnaire: {
          fields: '*',
          populate: {
            advantage: { fields: '*' },
            questionnaires: { fields: '*', populate: ['icon'] },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
