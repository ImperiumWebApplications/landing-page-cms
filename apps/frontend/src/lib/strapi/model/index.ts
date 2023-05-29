export * from './content-types';
export * from './landing-page';
export * from './questionnaire';
export * from './static-content';

export const CONTENT_TYPES = {
  LANDING_PAGES: 'landing-pages',
  STATIC_CONTENT: 'static-content',
  QUESTIONNAIRES: 'questionnaires',
  LEADS: 'leads',
} as const;
