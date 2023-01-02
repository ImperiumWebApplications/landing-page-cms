import React from 'react';

import type { Country } from '../../config/countries.config';
import type { SingleChoiceEventHandler } from './components/SingleChoice';
import type {
  LandingPage,
  Questionnaire as QuestionnaireType,
} from '../../lib/strapi';

import { Advantages } from './components/Advantages';
import { Question } from './components/Question';
import { PostalCode } from './components/PostalCode';
import { Confirmation } from './components/Confirmation';
import { BackButton } from './components/BackButton';
import { useQuestionnaireContext } from './context/Questionnaire';
import { FormWrapper } from '../../components/Layout';
import { ContactDetails } from './components/ContactDetails';

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

  const question = questions[state.index];
  const progress = state.index / (zeroBasedQuestionsCount + 3);

  return (
    <div
      id="questionnaire"
      className="h-full border-b-4 border-solid border-[white] bg-[#FAFAFA] p-4 md:p-12"
    >
      <FormWrapper className="relative grid h-auto max-w-6xl grid-cols-1 grid-rows-[auto_1fr] rounded-[20px] bg-[white] p-0 shadow-lg">
        <div className="h-2 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-[rgb(225,228,232)]">
          <span
            className="block h-full bg-secondary transition-[1s_ease_100ms]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="relative pt-8 text-center text-base uppercase tracking-wide after:absolute after:-bottom-4 after:left-[calc(50%-0.75rem)] after:h-[0.125rem] after:w-6 after:bg-secondary after:content-[''] md:pt-16">
          <BackButton hide={state.index === 0 || isFormSuccessStep} />
          <span className="text-sm">100% Kostenlos</span>
        </div>
        <div className="px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-32">
          {isQuestionStep ? (
            <Question
              data={question}
              customSelectHandler={customSelectHandler}
            />
          ) : null}
          {isPostalCodeStep && <PostalCode countries={countries} />}
          {isContactFormStep && <ContactDetails />}
          {isFormSuccessStep && <Confirmation phone={phone} />}
        </div>
        <Advantages content={advantages} />
      </FormWrapper>
    </div>
  );
};
