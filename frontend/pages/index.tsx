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
import { StepsSection } from '../sections/StepsSection';
import { VideoSection } from '../sections/VideoSection';

const Home: NextPage<DomainSpecificContent> = ({
  domainContent,
  staticContent,
}) => {
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
      {/* Steps Section */}
      {staticContent && (
        <StepsSection id="steps" staticContent={staticContent} />
      )}
      {/* Video Section */}
      {staticContent && (
        <VideoSection
          id="video"
          content={sections[SectionMapping.Video]}
          staticContent={staticContent}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
