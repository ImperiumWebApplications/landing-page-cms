import { LandingPage, StaticContent } from '../../lib/strapi';
import { CallToActionSection } from './CallToAction';

import { HeroSection } from './Hero';
import { ImagesSection } from './Images';
import { QuestionsSection } from './Questions';
import { ReviewsSection } from './Reviews';
import { buildSectionMap } from './SectionMapper';
import { ServicesSection } from './Services';
import { StatisticsSection } from './Statistics';
import { VideoSection } from './Video';

export const initSectionManager = (
  content: LandingPage,
  staticContent: StaticContent,
  { isNewDesign }: { isNewDesign?: boolean },
) => {
  const sectionMap = buildSectionMap(content);

  return {
    Hero: sectionMap?.hero ? (
      <HeroSection
        content={sectionMap.hero}
        staticContent={staticContent.hero_section}
      />
    ) : null,
    CallToAction:
      sectionMap?.callToAction && !isNewDesign ? (
        <CallToActionSection content={sectionMap.callToAction} />
      ) : null,
    Images:
      sectionMap?.images && !isNewDesign ? (
        <ImagesSection content={sectionMap.images} />
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
    Statistics:
      sectionMap?.statistics && !isNewDesign ? (
        <StatisticsSection content={sectionMap.statistics} />
      ) : null,
    Video: sectionMap?.video ? (
      <VideoSection
        content={sectionMap.video}
        staticContent={staticContent.video_section}
      />
    ) : null,
  };
};
