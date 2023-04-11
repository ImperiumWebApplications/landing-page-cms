import { Layout } from '../../components/Layout/Layout';
import { Questionnaire } from '../../features/Questionnaire/Questionnaire';
import { getCountryByDomain } from '../../utils/getCountryByDomain';
import {
  queryQuestionnairePageContent,
  QuestionnairePage,
} from '../../lib/next/app';
import {
  QuestionnairePlaceholderPage,
  QuestionnaireProvider,
} from '../../features/Questionnaire';
import { isHeroSection } from '../../features/Sections/SectionMapper';

const QuestionnairePage: QuestionnairePage = ({ content, questionnaire }) => {
  const country = getCountryByDomain(content.domain);
  const hero = content.sections?.find(isHeroSection);

  if (!questionnaire?.questions)
    return <QuestionnairePlaceholderPage content={content} />;

  return (
    <Layout content={content}>
      <QuestionnaireProvider>
        <Questionnaire
          headline={hero?.title || content.questionnaire?.headline}
          advantages={content.questionnaire?.advantages}
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
