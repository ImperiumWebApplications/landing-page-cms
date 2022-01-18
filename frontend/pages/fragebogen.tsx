import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import type {
  ConnectedQuestionnaireObjectList,
  QuestionnaireAnswer,
  QuestionnaireQuestion,
} from '../backend-api';
import type { SingleChoiceEventHandler } from '../components/Questionnaire/SingleChoice';
import { collectContentPageContent } from '../interface/request';
import { ContentPageContent } from '../interface/request';
import { QuestionnaireContextProvider } from '../context/Questionnaire';
import { Layout } from '../components/Layout';
import { Questionnaire } from '../components/Questionnaire/Questionnaire';
import { PagePlaceholder } from '../components/Questionnaire/Placeholder';
import { questionnaireRoute } from '../config/navigation.config';
import { slugifyRoute } from '../utils/slugifyRoute';

const EntryQuestionnairePage: NextPage<ContentPageContent> = ({
  domainContent,
}) => {
  const { questionnaire } = domainContent;
  const router = useRouter();

  if (!questionnaire) return <PagePlaceholder domainContent={domainContent} />;

  const entryQuestion: QuestionnaireQuestion = {
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

  return (
    <Layout content={domainContent}>
      <QuestionnaireContextProvider>
        <Questionnaire
          advantages={questionnaire.advantage}
          questions={[entryQuestion]}
          customSelectHandler={selectHandler}
        />
      </QuestionnaireContextProvider>
    </Layout>
  );
};

export const getServerSideProps = collectContentPageContent;

export default EntryQuestionnairePage;

/**
 * Helper function to map questionnaire relations to
 * standardized answers object schema.
 */

const mapConnectedQuestionnairesToAnswersSchema = (
  questionnaires: ConnectedQuestionnaireObjectList | undefined,
) => {
  return questionnaires
    ? questionnaires.data.map((questionnaire) => {
        return {
          id: questionnaire.id,
          answer_value: questionnaire.attributes.name,
          answer_icon: questionnaire.attributes.icon,
        } as QuestionnaireAnswer;
      })
    : undefined;
};
