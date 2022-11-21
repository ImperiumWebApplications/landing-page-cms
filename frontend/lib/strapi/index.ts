import { strapi as instance } from './instance';

import * as Queries from './queries';

export * from './model';

export const Strapi = {
  ...Queries,
  instance,
};
