export * from './content-types';
export * from './landing-page';
export * from './pipedrive-api';
export * from './questionnaire';
export * from './static-content';

export const CONTENT_TYPES = {
  LANDING_PAGES: 'landing-pages',
  STATIC_CONTENT: 'static-content',
  QUESTIONNAIRES: 'questionnaires',
  PIPEDRIVE_APIS: 'pipedrive-apis',
} as const;
