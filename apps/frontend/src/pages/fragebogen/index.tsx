import React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '../../components/Layout';
import { QuestionnaireConfig } from '../../config/i18n.config';
import { slugifyRoute } from '../../utils/slugifyRoute';
import { LandingPage } from '../../lib/strapi';
import { ContentPage, queryContentPageContent } from '../../lib/next/app';
import {
  Questionnaire,
  QuestionnairePlaceholderPage,
  QuestionnaireProvider,
} from '../../features/Questionnaire';
import { SingleChoiceEventHandler } from '../../features/Questionnaire/components/SingleChoice';
import { isHeroSection } from '../../features/Sections/SectionMapper';

const EntryQuestionnairePage: ContentPage = ({ content }) => {
  const { entryQuestion, questionnaires } = extractQuestionnaires(content);
  const router = useRouter();

  const config = QuestionnaireConfig[content.language ?? 'German'];

  if (!questionnaires)
    return <QuestionnairePlaceholderPage content={content} />;

  const question = {
    id: -1,
    question: entryQuestion ?? config.entryQuestionFallback,
    answers: mapConnectedQuestionnairesToAnswersSchema(questionnaires),
  };

  const selectHandler: SingleChoiceEventHandler = async ({ event, input }) => {
    event.preventDefault();
    const slug = slugifyRoute(input.answer.value);
    const selectedRoute = `/${config.route}/${slug}-${input.answer.id}`;
    await router.push(selectedRoute);
  };

  return (
    <Layout content={content}>
      <QuestionnaireProvider>
        <Questionnaire
          headline={content.sections?.find(isHeroSection)?.title}
          questions={[question]}
          countries={content.countries}
          customSelectHandler={selectHandler}
          advantages={
            content.questionnaires_advantages ??
            content.questionnaire?.advantages
          }
        />
      </QuestionnaireProvider>
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
    questionnaire: deprecatedQuestionnaire,
  } = landingPage;

  return {
    questionnaires:
      questionnaires_relations ?? deprecatedQuestionnaire?.questionnaires,
    entryQuestion:
      questionnaires_entry_question ?? deprecatedQuestionnaire?.entry_question,
    advantages:
      questionnaires_advantages ?? deprecatedQuestionnaire?.advantages,
  };
};
