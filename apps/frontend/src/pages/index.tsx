import type { NextPage } from 'next';

import type { LandingPage } from '../lib/strapi';
import { queryLandingPageContent } from '../lib/next/app';
import {
  initSectionManager,
  SectionContextProvider,
  SectionState,
} from '../features/Sections';
import { Layout } from '../components/Layout/Layout';
import { isServicesSection } from '../features/Sections/SectionMapper';

const IndexPage: NextPage<{ content: LandingPage }> = ({ content }) => {
  const isNewDesign =
    !!content.sections?.find(isServicesSection)?.benefits?.length;

  const SectionManager = initSectionManager(content, { isNewDesign });

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

export const getServerSideProps = queryLandingPageContent;

export default IndexPage;
