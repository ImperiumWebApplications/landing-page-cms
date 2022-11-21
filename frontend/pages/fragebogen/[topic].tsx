import type { NextPage } from 'next';

import type {
  LandingPage,
  Questionnaire as QuestionnaireType,
} from '../../lib/strapi';
import { Layout } from '../../components/Layout';
import { QuestionnaireContextProvider } from '../../context/Questionnaire';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { PagePlaceholder } from '../../components/Questionnaire/Placeholder';
import { getCountryByDomain } from '../../utils/getCountryByDomain';
import { queryQuestionnairePageContent } from '../../lib/next/app';

const QuestionnairePage: NextPage<{
  content: LandingPage;
  questionnaire: QuestionnaireType;
}> = ({ content, questionnaire }) => {
  const country = getCountryByDomain(content.domain);

  if (!questionnaire?.questions) return <PagePlaceholder content={content} />;

  return (
    <Layout content={content}>
      <QuestionnaireContextProvider>
        <Questionnaire
          questions={questionnaire.questions}
          countries={country ? [country] : undefined}
          advantages={content.questionnaire?.advantage}
          phone={content.contact_phone}
        />
      </QuestionnaireContextProvider>
    </Layout>
  );
};

export const getServerSideProps = queryQuestionnairePageContent;

export default QuestionnairePage;
