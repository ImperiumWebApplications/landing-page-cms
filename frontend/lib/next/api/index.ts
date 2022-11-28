import { createLeadFetcher } from './create-lead';
import { postalCodesFetcher } from './postal-codes';

export const NextAPI = {
  createLead: createLeadFetcher,
  getPostalCodeDetails: postalCodesFetcher,
};
