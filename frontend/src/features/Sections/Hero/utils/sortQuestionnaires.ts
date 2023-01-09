import { Questionnaire, Relation } from '../../../../lib/strapi';

export const sortQuestionnairesByPriority = (
  questionnaires: Relation<Questionnaire>['data'][],
) => {
  return [...questionnaires].sort(byPriority);
};

export const byPriority = (
  a: Relation<Questionnaire>['data'],
  b: Relation<Questionnaire>['data'],
): number => {
  return (a?.attributes?.priority ?? 5) - (b?.attributes?.priority ?? 5);
};
