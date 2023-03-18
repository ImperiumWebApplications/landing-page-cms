import {
  CallToActionSection,
  DynamicZoneItem,
  HeroSection,
  ImagesSection,
  LandingPage,
  LandingPageSections,
  QuestionsSection,
  ReviewsSection,
  Section,
  ServicesSection,
  StatisticsSection,
  VideoSection,
} from '../../lib/strapi';

export const buildSectionMap = (
  content: LandingPage,
): {
  hero?: HeroSectionContent;
  callToAction?: CallToActionSectionContent;
  images?: ImagesSectionContent;
  questions?: QuestionsSectionContent;
  reviews?: ReviewsSectionContent;
  services?: ServicesSectionContent;
  statistics?: StatisticsSectionContent;
  video?: VideoSectionContent;
} | null => {
  return (
    content.sections?.reduce((prev, section) => {
      return {
        ...prev,
        ...(isHeroSection(section)
          ? { hero: toHeroSectionContent(content, section) }
          : {}),
        ...(isCallToActionSection(section)
          ? { callToAction: toCallToActionSectionContent(content, section) }
          : {}),
        ...(isImagesSection(section)
          ? { images: toImagesSectionContent(content, section) }
          : {}),
        ...(isQuestionsSection(section)
          ? { questions: toQuestionsSectionContent(content, section) }
          : {}),
        ...(isReviewsSection(section)
          ? { reviews: toReviewsSectionContent(content, section) }
          : {}),
        ...(isServicesSection(section)
          ? { services: toServicesSectionContent(content, section) }
          : {}),
        ...(isStatisticsSection(section)
          ? { statistics: toStatisticsSectionContent(content, section) }
          : {}),
        ...(isVideoSection(section)
          ? { video: toVideoSectionContent(content, section) }
          : {}),
      };
    }, {}) ?? null
  );
};

/**
 * Call To Action Section
 */

const isCallToActionSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<CallToActionSection> =>
  section.__component === LandingPageSections.CALL_TO_ACTION;

const toCallToActionSectionContent = (
  content: LandingPage,
  section: CallToActionSection,
) => {
  return {
    ...section,
    phone: content.contact_phone ?? null,
  };
};

export type CallToActionSectionContent = ReturnType<
  typeof toCallToActionSectionContent
>;

/**
 * Images Section
 */

const isImagesSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<ImagesSection> =>
  section.__component === LandingPageSections.IMAGES;

const toImagesSectionContent = (
  content: LandingPage,
  section: ImagesSection,
) => {
  return {
    ...section,
    phone: content.contact_phone ?? null,
  };
};

export type ImagesSectionContent = ReturnType<typeof toImagesSectionContent>;

/**
 * Hero Section
 */

const isHeroSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<HeroSection> =>
  section.__component === LandingPageSections.HERO;

const toHeroSectionContent = (content: LandingPage, section: HeroSection) => {
  return {
    ...section,
    questionnaire: content.questionnaire ?? null,
    phone: content.contact_phone ?? null,
    serviceType: content.service_type ?? null,
  };
};

export type HeroSectionContent = ReturnType<typeof toHeroSectionContent>;

/**
 * Questions Section
 */

const isQuestionsSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<QuestionsSection> =>
  section.__component === LandingPageSections.QUESTIONS;

const toQuestionsSectionContent = (
  _: LandingPage,
  section: QuestionsSection,
) => {
  return {
    ...section,
  };
};

export type QuestionsSectionContent = ReturnType<
  typeof toQuestionsSectionContent
>;

/**
 * Reviews Section
 */

const isReviewsSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<ReviewsSection> =>
  section.__component === LandingPageSections.REVIEWS;

const toReviewsSectionContent = (_: LandingPage, section: ReviewsSection) => {
  return {
    ...section,
  };
};

export type ReviewsSectionContent = ReturnType<typeof toReviewsSectionContent>;

/**
 * Services Section
 */

export const isServicesSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<ServicesSection> =>
  section.__component === LandingPageSections.SERVICES;

const toServicesSectionContent = (
  content: LandingPage,
  section: ServicesSection,
) => {
  return {
    ...section,
    serviceType: content.service_type ?? null,
  };
};

export type ServicesSectionContent = ReturnType<
  typeof toServicesSectionContent
>;

/**
 * Statistics Section
 */

const isStatisticsSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<StatisticsSection> =>
  section.__component === LandingPageSections.STATISTICS;

const toStatisticsSectionContent = (
  _: LandingPage,
  section: StatisticsSection,
) => {
  return {
    ...section,
  };
};

export type StatisticsSectionContent = ReturnType<
  typeof toStatisticsSectionContent
>;

/**
 * Video Section
 */

const isVideoSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<VideoSection> =>
  section.__component === LandingPageSections.VIDEO;

const toVideoSectionContent = (_: LandingPage, section: VideoSection) => {
  return {
    ...section,
  };
};

export type VideoSectionContent = ReturnType<typeof toVideoSectionContent>;
