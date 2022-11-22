import type { NextPage } from 'next';

import type {
  LandingPage,
  Questionnaire as QuestionnaireType,
} from '../../lib/strapi';
import { Layout } from '../../components/Layout';
import { Questionnaire } from '../../features/Questionnaire/Questionnaire';
import { getCountryByDomain } from '../../utils/getCountryByDomain';
import { queryQuestionnairePageContent } from '../../lib/next/app';
import {
  QuestionnairePlaceholderPage,
  QuestionnaireProvider,
} from '../../features/Questionnaire';

const QuestionnairePage: NextPage<{
  content: LandingPage;
  questionnaire: QuestionnaireType;
}> = ({ content, questionnaire }) => {
  const country = getCountryByDomain(content.domain);

  if (!questionnaire?.questions)
    return <QuestionnairePlaceholderPage content={content} />;

  return (
    <Layout content={content}>
      <QuestionnaireProvider>
        <Questionnaire
          questions={questionnaire.questions}
          countries={country ? [country] : undefined}
          advantages={content.questionnaire?.advantage}
          phone={content.contact_phone}
        />
      </QuestionnaireProvider>
    </Layout>
  );
};

export const getServerSideProps = queryQuestionnairePageContent;

export default QuestionnairePage;
