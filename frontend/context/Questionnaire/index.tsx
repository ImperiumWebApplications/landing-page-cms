import React from 'react';

import type { QuestionnaireContextDispatch } from './dispatch';
import type { QuestionnaireContextState } from './state';
import { initialState } from './state';
import { QuestionnaireContextReducer } from './dispatch';

const QuestionnaireContext = React.createContext<
  | { state: QuestionnaireContextState; dispatch: QuestionnaireContextDispatch }
  | undefined
>(undefined);

export const QuestionnaireContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(
    QuestionnaireContextReducer,
    initialState,
  );
  const value = { state, dispatch };
  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaireContext = () => {
  const context = React.useContext(QuestionnaireContext);
  if (context === undefined)
    throw new Error(
      'useQuestionnaireContext must be used within a QuestionnaireContextProvider',
    );
  return context;
};
