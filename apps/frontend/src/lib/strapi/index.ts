import { strapi as instance } from './instance';

import * as Queries from './queries';
import * as Mutations from './mutations';

export * from './model';

export const Strapi = {
  ...Queries,
  ...Mutations,
  instance,
};
