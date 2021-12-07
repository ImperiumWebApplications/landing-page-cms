import type { NextPage } from 'next';

import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';
import {
  mapSectionsDataToSectionComponents,
  SectionMapping,
} from '../config/sections.config';
import { Layout } from '../components/Layout';
import { HeroSection } from '../sections/HeroSection';

const Home: NextPage<DomainSpecificContent> = ({ domainContent }) => {
  const sections = mapSectionsDataToSectionComponents(domainContent.sections);
  return (
    <Layout content={domainContent}>
      {/* Hero Section */}
      {sections[SectionMapping.Hero] && (
        <HeroSection
          id="hero"
          content={sections[SectionMapping.Hero]}
          questionnaire={domainContent.questionnaire}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
