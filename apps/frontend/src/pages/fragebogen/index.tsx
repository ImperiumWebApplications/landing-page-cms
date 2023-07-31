import React from 'react';
import { useRouter } from 'next/router';

import { questionnaireRoute } from '../../config/navigation.config';
import { Layout } from '../../components/Layout';
import { slugifyRoute } from '../../utils/slugifyRoute';
import { LandingPage } from '../../lib/strapi';
import { ContentPage, queryContentPageContent } from '../../lib/next/app';
import {
  Questionnaire,
  QuestionnairePlaceholder,
  QuestionnaireProvider,
} from '../../features/Questionnaire';
import { SingleChoiceEventHandler } from '../../features/Questionnaire/components/SingleChoice';
import { isHeroSection } from '../../features/Sections/SectionMapper';

const EntryQuestionnairePage: ContentPage = ({ content, staticContent }) => {
  const { entryQuestion, questionnaires } = extractQuestionnaires(content);
  const router = useRouter();

  const question = {
    id: -1,
    question: entryQuestion,
    answers: mapConnectedQuestionnairesToAnswersSchema(questionnaires),
  };

  const selectHandler: SingleChoiceEventHandler = async ({ event, input }) => {
    event.preventDefault();
    const slug = slugifyRoute(input.answer.value);
    const selectedRoute = `/${questionnaireRoute}/${slug}-${input.answer.id}`;
    await router.push(selectedRoute);
  };

  return (
    <Layout content={content} staticContent={staticContent}>
      {questionnaires?.data.length ? (
        <QuestionnaireProvider>
          <Questionnaire
            company_id={content.company_id}
            headline={content.sections?.find(isHeroSection)?.title}
            questions={[question]}
            staticContent={staticContent.questionnaire}
            countries={content.countries}
            customSelectHandler={selectHandler}
            advantages={content.questionnaires_advantages}
          />
        </QuestionnaireProvider>
      ) : (
        <QuestionnairePlaceholder />
      )}
    </Layout>
  );
};

export const getServerSideProps = queryContentPageContent;

export default EntryQuestionnairePage;

/**
 * Helper function to map questionnaire relations to
 * standardized answers object schema.
 */

const mapConnectedQuestionnairesToAnswersSchema = (
  questionnaires: LandingPage['questionnaires_relations'],
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

export const extractQuestionnaires = (landingPage: LandingPage) => {
  const {
    questionnaires_relations,
    questionnaires_entry_question,
    questionnaires_advantages,
  } = landingPage;

  return {
    questionnaires: questionnaires_relations,
    entryQuestion: questionnaires_entry_question,
    advantages: questionnaires_advantages,
  };
};
