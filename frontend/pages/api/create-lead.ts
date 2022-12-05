import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import {
  createLeadInCMS,
  createLeadInPipedrive,
  validateRequestBody,
} from '../../lib/next/api/create-lead';
import { sendMail } from '../../lib/next/api/send-mail';
import { captureNextAPIError, getErrorMessage } from '../../lib/next/api/error';
import { EmailTemplate } from '../../features/Questionnaire';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = validateRequestBody(req);

    await Promise.all([
      await createLeadInPipedrive(data),
      await createLeadInCMS(data),
      await sendMail({
        domain: data.domain,
        template: EmailTemplate.Confirmation,
        payload: { questionnaire: data.questionnaireResults },
        recipient: {
          firstName: data.contact.firstName,
          lastName: data.contact.lastName,
          email: data.contact.email,
          phone: data.contact.phone,
          postalCode: data.contact.postalCode,
          city: data.contact.city,
        },
      }),
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    captureNextAPIError(error);
    const message = getErrorMessage(error);
    res.status(500).json({ success: false, message });
  }
};

export default withSentry(handler);
