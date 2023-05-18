import { instance } from './instance';
import * as Queries from './queries';
import * as Mutations from './mutations';

export const Pipedrive = {
  ...Queries,
  ...Mutations,
  instance,
};
