import { createTransport } from 'nodemailer';

import type {
  EmailTemplate,
  EmailTemplatePayload,
} from '../../../config/emails.config';
import { EmailSubject } from '../../../config/emails.config';
import { StrapiAPI } from '../../../interface/backend';
import { generateHtmlEmailContent } from './utils/generateHtmlEmailContent';

export type SendMailProps = {
  host: string;
  template: keyof typeof EmailTemplate;
  payload: EmailTemplatePayload[keyof typeof EmailTemplate];
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postalCode: string;
  };
};

export const sendMail = async (data: SendMailProps) => {
  try {
    const { host, recipient, template, payload } = data;

    const landingPage = await StrapiAPI.getLandingPageStyleByDomain(host);

    if (!landingPage?.brand_name || !landingPage.logo?.data.attributes) {
      throw new Error('Missing data to send valid email.');
    }

    const html = generateHtmlEmailContent({
      recipient,
      landingPage,
      template,
      content: payload,
    });

    const transporter = createTransport({
      host: 'smtp.office365.com',
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      subject: EmailSubject[template],
      from: `"${landingPage.brand_name}" <${process.env.MAIL_USER}>`,
      replyTo: landingPage.contact_email,
      bcc: landingPage.contact_email,
      to: recipient.email,
      html,
    });
  } catch (error) {
    throw error;
  }
};
