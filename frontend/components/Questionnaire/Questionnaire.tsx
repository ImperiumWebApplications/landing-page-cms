import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import hexRgb from 'hex-rgb';
import { useRouter } from 'next/router';

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
import { isFunnelRoute } from '../../utils/isFunnelRoute';
import { setBrowserHistory } from '../../utils/setBrowserHistory';

const GlobalQuestionnaireStyle = createGlobalStyle`
  body {
    position: relative;
    background-color: ${({ theme }) =>
      hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.05 })};

    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: -50%;
      left: -50%;
      width: 200vw;
      height: 100vh;
      border-radius: 45% 55% 48% 52% / 50% 46% 54% 50%;
      background: linear-gradient(
        to bottom,
        ${({ theme }) =>
          hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.1 })}
        50%,
        ${({ theme }) =>
          hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.03 })}
        100%);

      @media screen and (${devices.lg}) {
        width: 100vw;
        height: 100vh;
        left: 0;
      }
    }
  }

  main {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const StyledQuestionnaire = styled(Section)`
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
`;

export type QuestionnaireHistoryState = {
  step?: number;
};

type QuestionnaireProps = {
  advantages: Advantage[];
  questions: QuestionnaireQuestion[];
  phone?: string;
  customSelectHandler?: SingleChoiceEventHandler;
};

export const Questionnaire: React.FunctionComponent<QuestionnaireProps> = ({
  advantages,
  questions,
  phone,
  customSelectHandler,
}) => {
  const router = useRouter();
  const _isFunnelRoute = isFunnelRoute(router);
  const { state, dispatch } = useQuestionnaireContext();

  React.useEffect(() => {
    // Initialize state on mount
    setBrowserHistory<QuestionnaireHistoryState>({ step: 0 });

    const goBackHandler = (event: PopStateEvent) => {
      const state = event.state as QuestionnaireHistoryState;
      if (state.step !== undefined) {
        dispatch({
          type: 'SET_CURRENT_INDEX',
          payload: { newIndex: state.step },
        });
      }
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
      {_isFunnelRoute && <GlobalQuestionnaireStyle />}
      <StyledQuestionnaire id="questionnaire">
        <div className="header">100% Kostenlos</div>
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
      </StyledQuestionnaire>
      <Advantages content={advantages} />
    </>
  );
};
