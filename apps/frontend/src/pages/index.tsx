import { ContentPage, queryContentPageContent } from '../lib/next/app';
import {
  initSectionManager,
  SectionContextProvider,
  SectionState,
} from '../features/Sections';
import { Layout } from '../components/Layout/Layout';
import { isServicesSection } from '../features/Sections/SectionMapper';

const IndexPage: ContentPage = ({ content, staticContent }) => {
  const isNewDesign =
    !!content.sections?.find(isServicesSection)?.benefits?.length;

  const SectionManager = initSectionManager(content, staticContent);

  const initialSectionState: SectionState = {
    isNewDesign,
  };

  return (
    <Layout content={content} staticContent={staticContent}>
      <SectionContextProvider initialState={initialSectionState}>
        {SectionManager.Hero}
        {SectionManager.Video}
        {SectionManager.Services}
        {SectionManager.Reviews}
        {SectionManager.Questions}
      </SectionContextProvider>
    </Layout>
  );
};

export const getServerSideProps = queryContentPageContent;

export default IndexPage;
