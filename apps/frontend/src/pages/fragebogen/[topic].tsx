import { Layout } from '../../components/Layout/Layout';
import { Questionnaire } from '../../features/Questionnaire/Questionnaire';
import {
  queryQuestionnairePageContent,
  QuestionnairePage,
} from '../../lib/next/app';
import {
  QuestionnairePlaceholder,
  QuestionnaireProvider,
  QuestionnaireState,
} from '../../features/Questionnaire';
import { isHeroSection } from '../../features/Sections/SectionMapper';

const QuestionnairePage: QuestionnairePage = ({
  content,
  staticContent,
  questionnaire,
}) => {
  const settings: QuestionnaireState['settings'] = {
    enablePostalCode: content.enable_postal_code ?? true,
  };

  return (
    <Layout content={content} staticContent={staticContent}>
      {questionnaire.questions?.length ? (
        <QuestionnaireProvider initialState={{ settings }}>
          <Questionnaire
            staticContent={staticContent.questionnaire}
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
      ) : (
        <QuestionnairePlaceholder />
      )}
    </Layout>
  );
};

export const getServerSideProps = queryQuestionnairePageContent;

export default QuestionnairePage;
