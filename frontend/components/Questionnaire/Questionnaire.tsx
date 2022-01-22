import React from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';

import type { Advantage, QuestionnaireQuestion } from '../../backend-api';
import type { SingleChoiceEventHandler } from './SingleChoice';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { Section } from '../Section';
import { Advantages } from './Advantages';
import { Question } from './Question';
import { PostalCode } from './PostalCode';
import { ContactForm } from './ContactForm';
import { Confirmation } from './Confirmation';
import { Progress } from './Progress';
import { BackButton } from './BackButton';
import { setBrowserHistory } from '../../utils/setBrowserHistory';
import { devices } from '../../config/breakpoints.config';

const StyledQuestionnaire = styled(Section)`
  padding: 1rem;
  border-bottom: 0.25rem solid white;
  background-color: ${({ theme }) =>
    hexRgb(theme.colors.primary, { format: 'css', alpha: 1 })};

  @media screen and (${devices.md}) {
    padding: 3rem;
  }

  & > .content-wrapper {
    position: relative;
    height: 100%;
    max-width: 67.5rem;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
    background-color: white;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 0;
  }

  .header {
    position: relative;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: +0.5px;
    padding-top: 2rem;

    @media screen and (${devices.md}) {
      padding-top: 4rem;
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
    padding: 3rem 1rem 4rem 1rem;

    @media screen and (${devices.md}) {
      padding: 4rem 2rem 8rem 2rem;
    }
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

  // Force pop-up "Do you really want to leave page?" during questionnaire
  React.useEffect(() => {
    window.onbeforeunload = () => true;
  }, []);

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
  const progress = state.currentIndex / (zeroBasedQuestionsCount + 3);

  return (
    <StyledQuestionnaire id="questionnaire">
      <Progress percentage={progress} />
      <div className="header">
        <BackButton />
        <span className="free-tier">100% Kostenlos</span>
      </div>
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
      </div>
      <Advantages content={advantages} />
    </StyledQuestionnaire>
  );
};
