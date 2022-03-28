import type { NextApiRequest } from 'next';
import { withSentry } from '@sentry/nextjs';

import type { DefaultApiRouteResponse } from '../../lib/api/response';
import { EmailTemplate } from '../../config/emails.config';
import { captureNextAPIError, getErrorMessage } from '../../lib/api/error';
import { sendMail, SendMailProps } from '../../lib/api/send-mail';

interface SendMailApiRequest extends NextApiRequest {
  body: SendMailProps;
}

export const handler = async (
  req: SendMailApiRequest,
  res: DefaultApiRouteResponse,
) => {
  try {
    const data = retrieveDataFromRequestBody(req);

    await sendMail(data);

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

const retrieveDataFromRequestBody = (req: SendMailApiRequest) => {
  try {
    if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

    if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE)
      throw new Error('Missing API route token.');

    if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD)
      throw new Error('Missing login data for email transport.');

    const { host, template, recipient, payload } = req.body;

    if (!host || !template || !recipient?.email)
      throw new Error('Missing data to send valid email.');

    switch (template) {
      case EmailTemplate.Confirmation:
        if (!!!payload?.questionnaire) break;
        return { host, template, recipient, payload };
    }

    throw new Error('Unknown email template provided.');
  } catch (error) {
    throw error;
  }
};
