import type {
  BooleanField,
  Component,
  DynamicZone,
  EnumerationField,
  Media,
  MediaList,
  MultiSelectField,
  NumberField,
  Relations,
  RepeatableComponent,
  TextField,
} from './content-types';
import type { Questionnaire } from './questionnaire';

/**
 * /api/landing-pages
 */

export const LandingPageSections = {
  HERO: 'sections.hero',
  STATISTICS: 'sections.statistics',
  CALL_TO_ACTION: 'sections.call-to-action',
  SERVICES: 'sections.services',
  REVIEWS: 'sections.reviews',
  IMAGES: 'sections.images',
  QUESTIONS: 'sections.faq',
  VIDEO: 'sections.video',
} as const;

export type LandingPageLanguage = 'German' | 'English';

export type LandingPage = {
  agb: TextField;
  google_tag_manager_id?: TextField;
  google_allow_indexation?: BooleanField;
  states_autocomplete?: BooleanField;
  company_id?: TextField;

  domain?: TextField;
  brand_name?: TextField;
  countries?: MultiSelectField<'AT' | 'DE' | 'CH' | 'US' | 'TH'>;
  enable_postal_code?: BooleanField;
  /** Don't access directly. Use `useLanguageContext`. */
  language?: EnumerationField<LandingPageLanguage>;
  contact_email?: TextField;
  contact_phone?: TextField;
  client_address?: TextField;
  client_vat?: TextField;

  seo_title?: TextField;
  seo_description?: TextField;

  color_primary?: TextField;
  color_secondary?: TextField;
  color_tertiary?: TextField;
  color_text?: TextField;

  favicon?: Media;
  logo?: Media;

  questionnaires_relations?: Relations<Questionnaire>;
  questionnaires_entry_question?: TextField;
  questionnaires_advantages?: Component<{
    personalized_advice?: TextField;
    years_of_experience?: TextField;
    custom_service?: TextField;
  }>;

  sections?: DynamicZone<Section>;
};

export type Section =
  | HeroSection
  | ServicesSection
  | ReviewsSection
  | QuestionsSection
  | VideoSection;

export type HeroSection = Component<{
  title?: TextField;
  subtitle?: TextField;
  background_image?: Media;
}>;

export type ServicesSection = Component<{
  title?: TextField;
  description?: TextField;
  service_image?: Media;
  benefits?: RepeatableComponent<{
    title?: TextField;
    description?: TextField;
  }>;
}>;

export type ReviewsSection = Component<{
  rating?: RepeatableComponent<{
    name?: TextField;
    biography?: TextField;
    description?: TextField;
    avatar?: Media;
  }>;
}>;

export type VideoSection = Component<{
  video?: Media;
  video_thumbnail?: Media;
  video_title?: TextField;
  video_description?: TextField;
  statistics?: RepeatableComponent<{
    label?: TextField;
    number?: TextField;
    number_suffix?: TextField;
  }>;
}>;

export type QuestionsSection = Component<{
  faq_item?: RepeatableComponent<{
    question?: TextField;
    answer?: TextField;
  }>;
}>;
