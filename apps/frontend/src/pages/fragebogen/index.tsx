import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Layout } from '../../components/Layout/Layout';
import { questionnaireRoute } from '../../config/navigation.config';
import { slugifyRoute } from '../../utils/slugifyRoute';
import { getCountryByDomain } from '../../utils/getCountryByDomain';
import { LandingPage } from '../../lib/strapi';
import { queryLandingPageContent } from '../../lib/next/app';
import {
  Questionnaire,
  QuestionnairePlaceholderPage,
  QuestionnaireProvider,
} from '../../features/Questionnaire';
import { SingleChoiceEventHandler } from '../../features/Questionnaire/components/SingleChoice';

const EntryQuestionnairePage: NextPage<{ content: LandingPage }> = ({
  content,
}) => {
  const { questionnaire } = content;
  const router = useRouter();

  if (!questionnaire) return <QuestionnairePlaceholderPage content={content} />;

  const entryQuestion = {
    id: -1,
    question: 'Was suchen Sie?',
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
      <QuestionnaireProvider>
        <Questionnaire
          headline={questionnaire.headline}
          questions={[entryQuestion]}
          countries={country ? [country] : undefined}
          customSelectHandler={selectHandler}
        />
      </QuestionnaireProvider>
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
