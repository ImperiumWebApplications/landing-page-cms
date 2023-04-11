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

  const SectionManager = initSectionManager(content, staticContent, {
    isNewDesign,
  });

  const initialSectionState: SectionState = {
    funnelTarget: content.funnel_target,
    isNewDesign,
  };

  return (
    <Layout content={content}>
      <SectionContextProvider initialState={initialSectionState}>
        {SectionManager.Hero}
        {SectionManager.Video}
        {SectionManager.CallToAction}
        {SectionManager.Services}
        {SectionManager.Reviews}
        {SectionManager.Images}
        {SectionManager.Questions}
      </SectionContextProvider>
    </Layout>
  );
};

export const getServerSideProps = queryContentPageContent;

export default IndexPage;
