import { ContentPage, queryContentPageContent } from '../lib/next/app';
import {
  initSectionManager,
  SectionContextProvider,
} from '../features/Sections';
import { Layout } from '../components/Layout/Layout';

const IndexPage: ContentPage = ({ content, staticContent }) => {
  const SectionManager = initSectionManager(content, staticContent);
  const font = content.selectfont;

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
