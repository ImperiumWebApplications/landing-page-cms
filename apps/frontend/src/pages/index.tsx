import { ContentPage, queryContentPageContent } from '../lib/next/app';
import {
  initSectionManager,
  SectionContextProvider,
} from '../features/Sections';
import { Layout } from '../components/Layout/Layout';
import { isServicesSection } from '../features/Sections/SectionMapper';

const IndexPage: ContentPage = ({ content, staticContent }) => {
  const SectionManager = initSectionManager(content, staticContent);

  return (
    <Layout content={content} staticContent={staticContent}>
      <SectionContextProvider>
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
