import {
  DynamicZoneItem,
  HeroSection,
  LandingPage,
  LandingPageSections,
  QuestionsSection,
  ReviewsSection,
  Section,
  ServicesSection,
  VideoSection,
} from '../../lib/strapi';

export const buildSectionMap = (
  content: LandingPage,
): {
  hero?: HeroSectionContent;
  questions?: QuestionsSectionContent;
  reviews?: ReviewsSectionContent;
  services?: ServicesSectionContent;
  video?: VideoSectionContent;
} | null => {
  return (
    content.sections?.reduce((prev, section) => {
      return {
        ...prev,
        ...(isHeroSection(section)
          ? { hero: toHeroSectionContent(content, section) }
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
        ...(isVideoSection(section)
          ? { video: toVideoSectionContent(content, section) }
          : {}),
      };
    }, {}) ?? null
  );
};

/**
 * Hero Section
 */

export const isHeroSection = (
  section: DynamicZoneItem<Section>,
): section is DynamicZoneItem<HeroSection> =>
  section.__component === LandingPageSections.HERO;

const toHeroSectionContent = (content: LandingPage, section: HeroSection) => {
  return {
    ...section,
    questionnaires_question: content.questionnaires_entry_question ?? null,
    questionnaires_relations: content.questionnaires_relations?.data ?? null,
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

const toServicesSectionContent = (_: LandingPage, section: ServicesSection) => {
  return {
    ...section,
  };
};

export type ServicesSectionContent = ReturnType<
  typeof toServicesSectionContent
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
