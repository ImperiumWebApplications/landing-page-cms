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
        id="hero"
        content={sectionMap.hero}
        staticContent={staticContent.hero_section}
      />
    ) : null,
    CallToAction:
      sectionMap?.callToAction && !isNewDesign ? (
        <CallToActionSection
          id="call-to-action"
          content={sectionMap.callToAction}
        />
      ) : null,
    Images:
      sectionMap?.images && !isNewDesign ? (
        <ImagesSection id="images" content={sectionMap.images} />
      ) : null,
    Questions: sectionMap?.questions ? (
      <QuestionsSection
        id="questions"
        content={sectionMap.questions}
        staticContent={staticContent.questions_section}
      />
    ) : null,
    Reviews: sectionMap?.reviews ? (
      <ReviewsSection
        id="reviews"
        content={sectionMap.reviews}
        staticContent={staticContent.reviews_section}
      />
    ) : null,
    Services: sectionMap?.services ? (
      <ServicesSection
        id="services"
        content={sectionMap.services}
        staticContent={staticContent.services_section}
      />
    ) : null,
    Statistics:
      sectionMap?.statistics && !isNewDesign ? (
        <StatisticsSection id="statistics" content={sectionMap.statistics} />
      ) : null,
    Video: sectionMap?.video ? (
      <VideoSection
        id="video"
        content={sectionMap.video}
        staticContent={staticContent.video_section}
      />
    ) : null,
  };
};
