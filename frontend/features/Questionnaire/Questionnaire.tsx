import React from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';

import type { Country } from '../../config/countries.config';
import type { SingleChoiceEventHandler } from './components/SingleChoice';
import type {
  LandingPage,
  Questionnaire as QuestionnaireType,
} from '../../lib/strapi';

import { devices } from '../../config/breakpoints.config';
import { Advantages } from './components/Advantages';
import { Question } from './components/Question';
import { PostalCode } from './components/PostalCode';
import { ContactForm } from './components/ContactForm';
import { Confirmation } from './components/Confirmation';
import { Progress } from './components/Progress';
import { BackButton } from './components/BackButton';
import { useQuestionnaireContext } from './context/Questionnaire';

const StyledQuestionnaire = styled.div`
  height: 100%;
  padding: 1rem;
  border-bottom: 0.25rem solid white;
  background-color: ${({ theme }) =>
    hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.075 })};

  @media screen and (${devices.md}) {
    padding: 3rem;
  }

  & > .content-wrapper {
    position: relative;
    height: auto;
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

export type QuestionnaireProps = {
  questions: NonNullable<QuestionnaireType['questions']>;
  countries?: Country[];
  advantages?: NonNullable<LandingPage['questionnaire']>['advantage'];
  phone?: string | null;
  customSelectHandler?: SingleChoiceEventHandler;
};

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  countries,
  advantages,
  questions,
  phone,
  customSelectHandler,
}) => {
  const { state } = useQuestionnaireContext();

  const zeroBasedQuestionsCount = questions.length - 1;
  const isQuestionStep = state.index <= zeroBasedQuestionsCount;
  const isPostalCodeStep = state.index === zeroBasedQuestionsCount + 1;
  const isContactFormStep = state.index === zeroBasedQuestionsCount + 2;
  const isFormSuccessStep = state.index === zeroBasedQuestionsCount + 3;

  const currentQuestionData = questions[state.index];
  const progress = state.index / (zeroBasedQuestionsCount + 3);

  return (
    <StyledQuestionnaire id="questionnaire">
      <div className="content-wrapper">
        <Progress percentage={progress} />
        <div className="header">
          <BackButton hide={state.index === 0 || isFormSuccessStep} />
          <span className="free-tier">100% Kostenlos</span>
        </div>
        <div className="content">
          {isQuestionStep && (
            <Question
              data={currentQuestionData}
              customSelectHandler={customSelectHandler}
            />
          )}
          {isPostalCodeStep && <PostalCode countries={countries} />}
          {isContactFormStep && <ContactForm />}
          {isFormSuccessStep && <Confirmation phone={phone} />}
        </div>
        <Advantages content={advantages} />
      </div>
    </StyledQuestionnaire>
  );
};
