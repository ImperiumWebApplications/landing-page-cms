import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import type { Country } from '../../config/countries.config';
import type { SingleChoiceEventHandler } from './components/SingleChoice';
import type {
  LandingPage,
  Questionnaire as QuestionnaireType,
} from '../../lib/strapi';

import { Question } from './components/Question';
import { PostalCode } from './components/PostalCode';
import { Confirmation } from './components/Confirmation';
import { BackButton } from './components/BackButton';
import { ContactDetails } from './components/ContactDetails';
import { ProgressBar } from './components/ProgressBar';
import { Advantages } from './components/Advantages';
import { useQuestionnaireContext } from './context/Questionnaire';
import { questionnaireRoute } from '../../config/navigation.config';
import { useIsScrolled } from '../../hooks/useIsScrolled';

export type QuestionnaireHistoryState = {
  step?: number;
};

export type QuestionnaireProps = {
  headline?: string | null;
  questions: NonNullable<QuestionnaireType['questions']>;
  countries?: Country[];
  phone?: string | null;
  advantages?: NonNullable<LandingPage['questionnaire']>['advantages'];
  customSelectHandler?: SingleChoiceEventHandler;
};

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  headline,
  countries,
  questions,
  phone,
  advantages,
  customSelectHandler: selectHandler,
}) => {
  const router = useRouter();
  const isScrolled = useIsScrolled();
  const { state } = useQuestionnaireContext();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const zeroBasedQuestionsCount = questions.length - 1;
  const isQuestionStep = state.index <= zeroBasedQuestionsCount;
  const isPostalCodeStep = state.index === zeroBasedQuestionsCount + 1;
  const isContactFormStep = state.index === zeroBasedQuestionsCount + 2;
  const isFormSuccessStep = state.index === zeroBasedQuestionsCount + 3;

  const question = questions[state.index];

  const isEntryQuestion = router.pathname === `/${questionnaireRoute}`;
  const base = !isEntryQuestion ? 1 : 0;
  const progress = (state.index + base) / (zeroBasedQuestionsCount + 3 + base);

  const advantageItems = useMemo(() => {
    const items = Object.values(advantages || {});
    return items.filter((item) => typeof item === 'string') as string[];
  }, [advantages]);

  return (
    <div
      data-testid="questionnaire"
      className="mx-auto flex h-full max-w-[1400px] flex-col justify-between bg-tertiary md:rounded-t-[10px]"
    >
      <div>
        <div className="content-wrapper py-4 text-center md:pt-14 md:pb-12">
          <h1 className="text-lg text-gray md:text-3xl">{headline}</h1>
          <span className="mt-2 block text-sm md:mt-4">100% Kostenlos</span>
        </div>
        <div className="max-w relative mx-auto grid h-auto min-h-[420px] max-w-[964px] grid-cols-1 grid-rows-[auto_1fr] bg-[white] py-5 md:mb-12 md:rounded-[10px] md:pt-12 md:pb-10 md:shadow-sm">
          <BackButton
            className={
              isFormSuccessStep || (isScrolled && isMobile)
                ? 'invisible absolute opacity-0'
                : 'fixed left-4 top-[25px] z-10 opacity-100 transition-all md:absolute md:left-8 md:top-8'
            }
          />
          <div className="px-4">
            {isQuestionStep && (
              <Question data={question} customSelectHandler={selectHandler} />
            )}
            {isPostalCodeStep && <PostalCode countries={countries} />}
            {isContactFormStep && <ContactDetails />}
            {isFormSuccessStep && <Confirmation phone={phone} />}
          </div>
          {!isEntryQuestion && !isContactFormStep && !isFormSuccessStep && (
            <ProgressBar progress={Math.floor(progress * 100)} />
          )}
        </div>
      </div>
      <Advantages items={advantageItems} />
    </div>
  );
};
