import type { NextApiRequest } from 'next';

import type { SendMailProps } from './send-mail';
import { EmailTemplate, EmailTemplatePayload } from '../../../../../email';

export interface SendMailRequest extends NextApiRequest {
  body: {
    domain?: string;
    template?: string;
    payload?: EmailTemplatePayload[keyof typeof EmailTemplate];
    recipient?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      postalCode?: string;
    };
  };
}

export const validateRequestBody = (req: SendMailRequest): SendMailProps => {
  if (req.method !== 'POST' && req.method !== 'OPTIONS')
    throw new Error('Unsupported HTTP method.');

  if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE)
    throw new Error('Missing API route token.');

  if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD)
    throw new Error('Missing login data for email transport.');

  const { domain, template, recipient, payload } = req.body;

  if (!domain || !template || !isSufficient(recipient))
    throw new Error('Missing data to send valid email.');

  switch (template) {
    case EmailTemplate.Confirmation:
      if (!!!payload?.questionnaire && !!!payload?.appointments) break;
      return { domain, template, recipient, payload };
  }

  throw new Error('Unknown email template provided.');
};

const isSufficient = (
  recipient: SendMailRequest['body']['recipient'],
): recipient is SendMailProps['recipient'] => {
  if (!recipient?.email) return false;
  if (!recipient?.phone) return false;
  if (!recipient?.lastName) return false;
  if (!recipient?.firstName) return false;
  return true;
};
