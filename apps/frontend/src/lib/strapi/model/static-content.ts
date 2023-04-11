import type {
  Component,
  Media,
  RepeatableComponent,
  TextField,
} from './content-types';

/**
 * /api/static-content
 */

export type StaticContent = {
  /** Markdown Text */
  imprint: TextField;
  /** Markdown Text */
  privacy: TextField;
  /** Static Content for Hero Section */
  hero_section?: Component<{
    hero_advantage?: RepeatableComponent<{
      description?: TextField;
      icon?: Media;
    }>;
  }>;
  /** Static Content for Video Section */
  video_section?: Component<{
    video?: Media;
    video_thumbnail?: Media;
  }>;
  /** Static Content for Services Section */
  services_section?: Component<{
    call_to_action_banner_title?: TextField;
    process_title?: TextField;
    process_step?: RepeatableComponent<{
      description?: TextField;
      icon?: Media;
    }>;
    process_advantage_title?: TextField;
    process_advantage?: RepeatableComponent<{
      description?: TextField;
    }>;
  }>;
  /** Static Content for Reviews Section */
  reviews_section?: Component<{
    title?: TextField;
    call_to_action_banner_title?: TextField;
  }>;
  /** Static Content for Questions Section */
  questions_section?: Component<{
    title?: TextField;
  }>;
};
