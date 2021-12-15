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
import { StatisticsSection } from '../sections/StatisticsSection';
import { CallToActionSection } from '../sections/CallToActionSection';

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
      {sections[SectionMapping.Video] && staticContent && (
        <VideoSection
          id="video"
          content={sections[SectionMapping.Video]}
          staticContent={staticContent}
        />
      )}
      {/* Statistics Section */}
      {sections[SectionMapping.Statistics] && (
        <StatisticsSection
          id="statistics"
          content={sections[SectionMapping.Statistics]}
        />
      )}
      {/* CallToAction Section */}
      {sections[SectionMapping.CallToAction] && (
        <CallToActionSection
          id="call-to-action"
          phoneNumber={domainContent.contact_phone}
          content={sections[SectionMapping.CallToAction]}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
