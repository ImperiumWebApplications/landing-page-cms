import type { QuestionnaireHistoryState } from '../components/Questionnaire/Questionnaire';
import { QuestionnaireContextDispatch } from '../context/Questionnaire/dispatch';
import { setBrowserHistory } from './setBrowserHistory';

export const goToStep = (
  dispatch: QuestionnaireContextDispatch,
  step: number,
) => {
  dispatch({ type: 'SET_CURRENT_INDEX', payload: { newIndex: step } });
  setBrowserHistory<QuestionnaireHistoryState>({ step });
};
