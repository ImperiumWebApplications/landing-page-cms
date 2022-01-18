import type { QuestionnaireContextState } from '../context/Questionnaire/state';

export const isFormDataComplete = (state: QuestionnaireContextState) => {
  return !Object.values(state.contact).some((field) => {
    if (typeof field.value === 'boolean') return field.value === false;
    return !/(.|\s)*\S(.|\s)*/.test(field.value);
  });
};
