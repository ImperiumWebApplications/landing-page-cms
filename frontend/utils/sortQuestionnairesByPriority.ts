import type { ConnectedQuestionnaire, DataObject } from '../backend-api';

export const sortQuestionnairesByPriority = (
  questionnaires: DataObject<ConnectedQuestionnaire>[],
) => {
  return [...questionnaires].sort(byPriority);
};

export const byPriority = (
  a: DataObject<ConnectedQuestionnaire>,
  b: DataObject<ConnectedQuestionnaire>,
): number => {
  return (a.attributes.priority ?? 5) - (b.attributes.priority ?? 5);
};
