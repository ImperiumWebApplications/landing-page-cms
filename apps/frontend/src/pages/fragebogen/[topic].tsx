import { Layout } from '../../components/Layout/Layout';
import { Questionnaire } from '../../features/Questionnaire/Questionnaire';
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
  if (!questionnaire?.questions)
    return <QuestionnairePlaceholderPage content={content} />;

  return (
    <Layout content={content}>
      <QuestionnaireProvider>
        <Questionnaire
          headline={content.sections?.find(isHeroSection)?.title}
          questions={questionnaire.questions}
          countries={content.countries}
          phone={content.contact_phone}
          advantages={
            content.questionnaires_advantages ??
            content.questionnaire?.advantages
          }
        />
      </QuestionnaireProvider>
    </Layout>
  );
};

export const getServerSideProps = queryQuestionnairePageContent;

export default QuestionnairePage;
