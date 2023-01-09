import type { TextField } from './content-types';

/**
 * /api/static-content
 */

export type StaticContent = {
  /** Markdown Text */
  imprint: TextField;
  /** Markdown Text */
  privacy: TextField;
};
