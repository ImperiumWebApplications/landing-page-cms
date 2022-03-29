import type { NextPage } from 'next';

import type { QuestionnairePageContent } from '../../interface/getServerSideProps';
import { collectQuestionnairePageContent } from '../../interface/getServerSideProps';
import { Layout } from '../../components/Layout';
import { QuestionnaireContextProvider } from '../../context/Questionnaire';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { PagePlaceholder } from '../../components/Questionnaire/Placeholder';
import { getCountryByDomain } from '../../utils/getCountryByDomain';

const QuestionnairePage: NextPage<QuestionnairePageContent> = ({
  domainContent,
  questionnaireContent,
}) => {
  const { questionnaire, domain } = domainContent;
  const country = getCountryByDomain(domain);

  if (!questionnaire || !questionnaireContent.questions)
    return <PagePlaceholder domainContent={domainContent} />;

  return (
    <Layout content={domainContent}>
      <QuestionnaireContextProvider>
        <Questionnaire
          questions={questionnaireContent.questions}
          countries={country ? [country] : undefined}
          advantages={questionnaire.advantage}
          phone={domainContent.contact_phone}
          tracking={domainContent.tracking}
        />
      </QuestionnaireContextProvider>
    </Layout>
  );
};

export const getServerSideProps = collectQuestionnairePageContent;

export default QuestionnairePage;
