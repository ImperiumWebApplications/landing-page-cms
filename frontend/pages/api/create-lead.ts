import type { NextApiRequest } from 'next';
import { withSentry } from '@sentry/nextjs';

import type { DefaultApiRouteResponse } from '../../lib/api/response';
import { EmailTemplate } from '../../config/emails.config';
import { normalizeHostname } from '../../utils/normalizeHostname';
import { InternalAPI } from '../../lib/api/internal';
import { captureNextAPIError, getErrorMessage } from '../../lib/api/error';
import { CreateLeadInPipedriveProps } from '../../lib/api/create-lead';

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
          firstName: data.contact.firstName.value,
          lastName: data.contact.lastName.value,
          email: data.contact.email.value,
          phone: data.contact.phone.value,
          postalCode: data.contact.postalCode.value,
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

const retrieveDataFromRequestBody = (req: CreateLeadApiRequest) => {
  try {
    if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

    if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE)
      throw new Error('Missing or invalid public API route query param.');

    const host = normalizeHostname(req.headers.host);
    const contact = req.body.contact;
    const questionnaire = req.body.questionnaire;

    if (!host || !contact || !questionnaire?.length)
      throw new Error('Missing or invalid form data.');

    return { host, contact, questionnaire };
  } catch (error) {
    throw error;
  }
};
