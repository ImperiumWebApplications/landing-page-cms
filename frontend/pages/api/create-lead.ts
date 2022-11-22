import type { NextApiRequest } from 'next';
import { withSentry } from '@sentry/nextjs';

import type { DefaultApiRouteResponse } from '../../lib/next/api/response';
import type { CreateLeadInPipedriveProps } from '../../lib/next/api/create-lead';
import { EmailTemplate } from '../../features/Questionnaire';
import { InternalAPI } from '../../lib/next/api/internal';
import { captureNextAPIError, getErrorMessage } from '../../lib/next/api/error';
import { normalizeHostname } from '../../utils/normalizeHostname';

export interface CreateLeadApiRequest extends NextApiRequest {
  body: CreateLeadInPipedriveProps;
}

export const handler = async (
  req: CreateLeadApiRequest,
  res: DefaultApiRouteResponse,
) => {
  try {
    const data = retrieveDataFromRequestBody(req);

    await Promise.all([
      await InternalAPI.createLeadInPipedrive(data),
      await InternalAPI.sendMail({
        host: data.host,
        template: EmailTemplate.Confirmation,
        payload: { questionnaire: data.questionnaire },
        recipient: {
          // We type-check data.contact in retrieveDataFromRequestBody
          firstName: data.contact.firstName!,
          lastName: data.contact.lastName!,
          email: data.contact.email!,
          phone: data.contact.phone!,
          postalCode: data.contact.postalCode!,
        },
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    captureNextAPIError(error);
    const message = getErrorMessage(error);
    return res.status(500).json({ success: false, message });
  }
};

export default withSentry(handler);

/**
 *
 * HELPER FUNCTIONS
 *
 */

export const retrieveDataFromRequestBody = (req: CreateLeadApiRequest) => {
  try {
    if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

    if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE)
      throw new Error('Missing or invalid public API route query param.');

    const host = normalizeHostname(req.body.host ?? req.headers?.host);
    const contact = req.body.contact;
    const questionnaire = req.body.questionnaire;

    if (!host || !isContactDataComplete(contact) || !questionnaire?.length)
      throw new Error('Missing or invalid form data.');

    return { host, contact, questionnaire };
  } catch (error) {
    throw error;
  }
};

const isContactDataComplete = (
  data: CreateLeadApiRequest['body']['contact'],
) => {
  const values = Object.values(data);
  if (values.length === 0) return false;

  return !values.some((value) => typeof value === 'undefined');
};
