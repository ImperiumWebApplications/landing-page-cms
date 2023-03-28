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
import { isHeroSection } from '../../features/Sections/SectionMapper';

const QuestionnairePage: NextPage<{
  content: LandingPage;
  questionnaire: QuestionnaireType;
}> = ({ content, questionnaire }) => {
  const country = getCountryByDomain(content.domain);
  const hero = content.sections?.find(isHeroSection);

  if (!questionnaire?.questions)
    return <QuestionnairePlaceholderPage content={content} />;

  return (
    <Layout content={content}>
      <QuestionnaireProvider>
        <Questionnaire
          headline={hero?.title || content.questionnaire?.headline}
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
