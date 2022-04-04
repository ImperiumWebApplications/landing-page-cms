import {
  ContactFields,
  hiddenFieldsOnContactForm,
} from '../config/form.config';
import type { QuestionnaireContextState } from '../context/Questionnaire/state';

export const isFormDataComplete = (state: QuestionnaireContextState) => {
  return !Object.entries(state.contact).some(([key, field]) => {
    if (typeof field.value === 'boolean') return field.value === false;
    if (hiddenFieldsOnContactForm.indexOf(key as ContactFields) !== -1)
      return false;

    return !/(.|\s)*\S(.|\s)*/.test(field.value);
  });
};
