import type { NextPage } from 'next';

import type {
  LandingPage,
  Questionnaire as QuestionnaireType,
} from '../../lib/strapi';
import { Layout } from '../../components/Layout/Layout';
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
          headline={content.questionnaire?.headline}
          questions={questionnaire.questions}
          countries={country ? [country] : undefined}
          phone={content.contact_phone}
        />
      </QuestionnaireProvider>
    </Layout>
  );
};

export const getServerSideProps = queryQuestionnairePageContent;

export default QuestionnairePage;
