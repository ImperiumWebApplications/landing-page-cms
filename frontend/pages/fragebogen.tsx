import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import type { SingleChoiceEventHandler } from '../components/Questionnaire/SingleChoice';
import { QuestionnaireContextProvider } from '../context/Questionnaire';
import { Layout } from '../components/Layout';
import { Questionnaire } from '../components/Questionnaire/Questionnaire';
import { PagePlaceholder } from '../components/Questionnaire/Placeholder';
import { questionnaireRoute } from '../config/navigation.config';
import { slugifyRoute } from '../utils/slugifyRoute';
import { getCountryByDomain } from '../utils/getCountryByDomain';
import { LandingPage } from '../lib/strapi';
import { queryLandingPageContent } from '../lib/next/app';

const EntryQuestionnairePage: NextPage<{ content: LandingPage }> = ({
  content,
}) => {
  const { questionnaire } = content;
  const router = useRouter();

  if (!questionnaire) return <PagePlaceholder content={content} />;

  const entryQuestion = {
    id: -1,
    question: questionnaire.entry_question ?? 'Was suchen Sie?',
    answers: mapConnectedQuestionnairesToAnswersSchema(
      questionnaire.questionnaires,
    ),
  };

  const selectHandler: SingleChoiceEventHandler = async ({ event, input }) => {
    event.preventDefault();
    const slug = slugifyRoute(input.answer.value);
    const selectedRoute = `/${questionnaireRoute}/${slug}-${input.answer.id}`;
    await router.push(selectedRoute);
  };

  const country = getCountryByDomain(content.domain);

  return (
    <Layout content={content}>
      <QuestionnaireContextProvider>
        <Questionnaire
          questions={[entryQuestion]}
          countries={country ? [country] : undefined}
          advantages={questionnaire.advantage}
          customSelectHandler={selectHandler}
        />
      </QuestionnaireContextProvider>
    </Layout>
  );
};

export const getServerSideProps = queryLandingPageContent;

export default EntryQuestionnairePage;

/**
 * Helper function to map questionnaire relations to
 * standardized answers object schema.
 */

const mapConnectedQuestionnairesToAnswersSchema = (
  questionnaires: NonNullable<LandingPage['questionnaire']>['questionnaires'],
) => {
  return questionnaires
    ? questionnaires.data.map((questionnaire) => {
        return {
          id: questionnaire.id,
          answer_value: questionnaire.attributes?.name,
          answer_icon: questionnaire.attributes?.icon,
        };
      })
    : undefined;
};
