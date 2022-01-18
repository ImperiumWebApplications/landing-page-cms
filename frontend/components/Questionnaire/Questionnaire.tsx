import React from 'react';
import styled from 'styled-components';

import type { Advantage, QuestionnaireQuestion } from '../../backend-api';
import type { SingleChoiceEventHandler } from './SingleChoice';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { Section } from '../Section';
import { Advantages } from './Advantages';
import { Question } from './Question';
import { PostalCode } from './PostalCode';
import { ContactForm } from './ContactForm';
import { Confirmation } from './Confirmation';
import { StepNavigation } from './StepNavigation';
import { devices } from '../../config/breakpoints.config';
import { setBrowserHistory } from '../../utils/setBrowserHistory';

const StyledQuestionnaire = styled(Section)`
  .content-wrapper {
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
  }

  .header {
    position: relative;
    margin-bottom: 3rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: +0.5px;

    @media screen and (${devices.sm}) {
      margin-bottom: 4rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: calc(50% - 0.75rem);
      width: 1.5rem;
      height: 0.125rem;
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  .content {
    place-self: center;
  }
`;

export type QuestionnaireHistoryState = {
  step?: number;
};

type QuestionnaireProps = {
  questions: QuestionnaireQuestion[];
  advantages?: Advantage[];
  phone?: string;
  customSelectHandler?: SingleChoiceEventHandler;
};

export const Questionnaire: React.FunctionComponent<QuestionnaireProps> = ({
  advantages,
  questions,
  phone,
  customSelectHandler,
}) => {
  const { state, dispatch } = useQuestionnaireContext();

  React.useEffect(() => {
    // Initialize state on mount
    setBrowserHistory<QuestionnaireHistoryState>({ step: 0 });

    const goBackHandler = (event: PopStateEvent) => {
      const state = event.state as QuestionnaireHistoryState;
      if (state.step === undefined) return window.history.back();
      if (state.step >= 0)
        return dispatch({
          type: 'SET_CURRENT_INDEX',
          payload: { newIndex: state.step },
        });
    };

    window.addEventListener('popstate', goBackHandler);
    return () => window.removeEventListener('popstate', goBackHandler);
  }, [dispatch]);

  const zeroBasedQuestionsCount = questions.length - 1;
  const isQuestionStep = state.currentIndex <= zeroBasedQuestionsCount;
  const isPostalCodeStep = state.currentIndex === zeroBasedQuestionsCount + 1;
  const isContactFormStep = state.currentIndex === zeroBasedQuestionsCount + 2;
  const isFormSuccessStep = state.currentIndex === zeroBasedQuestionsCount + 3;

  const currentQuestionData = questions[state.currentIndex];

  return (
    <>
      <StyledQuestionnaire id="questionnaire">
        <div className="header">100% Kostenlos</div>
        <div className="content">
          {isQuestionStep && (
            <Question
              data={currentQuestionData}
              customSelectHandler={customSelectHandler}
            />
          )}
          {isPostalCodeStep && <PostalCode />}
          {isContactFormStep && <ContactForm />}
          {isFormSuccessStep && <Confirmation phone={phone} />}
          {(isQuestionStep || isPostalCodeStep) && (
            <StepNavigation stepCount={zeroBasedQuestionsCount + 3} />
          )}
        </div>
      </StyledQuestionnaire>
      <Advantages content={advantages} />
    </>
  );
};
