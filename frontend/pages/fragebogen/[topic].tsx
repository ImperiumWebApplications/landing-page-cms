import type { NextPage } from 'next';

import type { QuestionnairePageContent } from '../../interface/getServerSideProps';
import { collectQuestionnairePageContent } from '../../interface/getServerSideProps';
import { Layout } from '../../components/Layout';
import { QuestionnaireContextProvider } from '../../context/Questionnaire';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { PagePlaceholder } from '../../components/Questionnaire/Placeholder';

const QuestionnairePage: NextPage<QuestionnairePageContent> = ({
  domainContent,
  questionnaireContent,
}) => {
  const { questionnaire } = domainContent;

  if (!questionnaire || !questionnaireContent.questions)
    return <PagePlaceholder domainContent={domainContent} />;

  return (
    <Layout content={domainContent}>
      <QuestionnaireContextProvider>
        <Questionnaire
          advantages={questionnaire.advantage}
          questions={questionnaireContent.questions}
          phone={domainContent.contact_phone}
          tracking={domainContent.tracking}
        />
      </QuestionnaireContextProvider>
    </Layout>
  );
};

export const getServerSideProps = collectQuestionnairePageContent;

export default QuestionnairePage;
