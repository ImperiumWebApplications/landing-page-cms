import { sendMail } from './send-mail';
import { getPostalCodeDetails } from './postal-codes';
import { createLeadInPipedrive } from './create-lead';

export const InternalAPI = {
  createLeadInPipedrive,
  getPostalCodeDetails,
  sendMail,
};
