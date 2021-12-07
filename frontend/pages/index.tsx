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
        <StepsSection
          id="steps"
          steps={[
            staticContent.user_step_one,
            staticContent.user_step_two,
            staticContent.user_step_three,
          ]}
        />
      )}
      {/* Video Section */}
      Hello
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Home;
