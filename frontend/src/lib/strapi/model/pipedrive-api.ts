import type { Relation, TextField } from './content-types';
import type { LandingPage } from './landing-page';

/**
 * /api/pipedrive-apis
 */

export type PipedriveApi = {
  api_token: TextField;
  landing_page: Relation<LandingPage>;
};
