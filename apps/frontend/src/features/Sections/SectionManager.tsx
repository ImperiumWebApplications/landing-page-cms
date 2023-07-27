import { LandingPage, StaticContent } from '../../lib/strapi';

import { HeroSection } from './Hero';
import { QuestionsSection } from './Questions';
import { ReviewsSection } from './Reviews';
import { buildSectionMap } from './SectionMapper';
import { ServicesSection } from './Services';
import { VideoSection } from './Video';

export const initSectionManager = (
  content: LandingPage,
  staticContent: StaticContent,
) => {
  const sectionMap = buildSectionMap(content);

  return {
    Hero: sectionMap?.hero ? (
      <HeroSection
        content={sectionMap.hero}
        staticContent={staticContent.hero_section}
      />
    ) : null,
    Questions: sectionMap?.questions ? (
      <QuestionsSection
        content={sectionMap.questions}
        staticContent={staticContent.questions_section}
      />
    ) : null,
    Reviews: sectionMap?.reviews ? (
      <ReviewsSection
        content={sectionMap.reviews}
        staticContent={staticContent.reviews_section}
      />
    ) : null,
    Services: sectionMap?.services ? (
      <ServicesSection
        content={sectionMap.services}
        staticContent={staticContent.services_section}
      />
    ) : null,

    Video: sectionMap?.video ? (
      <VideoSection
        content={sectionMap.video}
        staticContent={staticContent.video_section}
      />
    ) : null,
  };
};
