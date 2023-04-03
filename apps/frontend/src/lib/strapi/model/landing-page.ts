import type {
  BooleanField,
  Component,
  DynamicZone,
  EnumerationField,
  Media,
  MediaList,
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

export type LandingPage = {
  google_tag_manager_id?: TextField;
  google_allow_indexation?: BooleanField;

  domain?: TextField;
  service_type?: TextField;
  brand_name?: TextField;
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

  funnel_target?: EnumerationField<'Questionnaire' | 'Appointment'>;

  favicon?: Media;
  logo?: Media;

  questionnaire?: Component<{
    entry_question?: TextField;
    headline?: TextField;
    questionnaires?: Relations<Questionnaire>;
    advantage?: RepeatableComponent<{
      first_line?: TextField;
      second_line?: TextField;
    }>;
    advantages?: Component<{
      personalized_advice?: TextField;
      years_of_experience?: TextField;
      custom_service?: TextField;
    }>;
  }>;

  appointment?: Component<{
    appointment_duration?: EnumerationField<
      'x30min' | 'x60min' | 'x90min' | 'x120min'
    >;
    appointment_location?: Component<{
      appointment_location_at_home?: BooleanField;
      appointment_location_on_site?: BooleanField;
      appointment_location_virtual?: BooleanField;
      appointment_location_to_be_discussed?: BooleanField;
    }>;
    appointment_availability?: RepeatableComponent<{
      /** '17:00:00' */
      from_time?: TextField;
      /** '17:00:00' */
      to_time?: TextField;
      day?: EnumerationField<
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday'
      >;
    }>;
  }>;

  sections?: DynamicZone<Section>;
};

export type Section =
  | HeroSection
  | StatisticsSection
  | CallToActionSection
  | ServicesSection
  | ReviewsSection
  | QuestionsSection
  | ImagesSection
  | VideoSection;

export type HeroSection = Component<{
  title?: TextField;
  subtitle?: TextField;
  description?: TextField;
  background_image?: Media;
}>;

export type StatisticsSection = Component<{
  background_image?: Media;
  number?: RepeatableComponent<{
    label?: TextField;
    number?: NumberField;
    number_suffix?: TextField;
  }>;
}>;

export type CallToActionSection = Component<{
  title?: TextField;
  subtitle?: TextField;
  service_description?: TextField;
}>;

export type ServicesSection = Component<{
  title?: TextField;
  description?: TextField;
  service_image?: Media;
  benefits?: RepeatableComponent<{
    title?: TextField;
    description?: TextField;
  }>;
  service_tab?: RepeatableComponent<{
    tab_name?: TextField;
    title?: TextField;
    subtitle?: TextField;
    description?: TextField;
    service_examples?: TextField;
    service_images?: MediaList;
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

export type ImagesSection = Component<{
  images?: MediaList;
}>;

export type VideoSection = Component<{
  video_title?: TextField;
  video_description?: TextField;
  statistics?: RepeatableComponent<{
    label?: TextField;
    number?: NumberField;
    number_suffix?: TextField;
  }>;
}>;

export type QuestionsSection = Component<{
  faq_item?: RepeatableComponent<{
    question?: TextField;
    answer?: TextField;
  }>;
}>;
