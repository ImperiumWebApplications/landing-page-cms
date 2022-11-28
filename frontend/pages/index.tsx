import type { NextPage } from 'next';

import type { LandingPage } from '../lib/strapi';
import { queryLandingPageContent } from '../lib/next/app';
import { initSectionManager } from '../features/Sections';
import { Layout } from '../components/Layout/Layout';

const IndexPage: NextPage<{ content: LandingPage }> = ({ content }) => {
  const SectionManager = initSectionManager(content);

  return (
    <Layout content={content}>
      {SectionManager.Hero}
      {SectionManager.Steps}
      {SectionManager.Video}
      {SectionManager.Statistics}
      {SectionManager.CallToAction}
      {SectionManager.Services}
      {SectionManager.Reviews}
      {SectionManager.Images}
      {SectionManager.Questions}
    </Layout>
  );
};

export const getServerSideProps = queryLandingPageContent;

export default IndexPage;
