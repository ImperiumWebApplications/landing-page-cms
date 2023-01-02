import { createTransport } from 'nodemailer';
import {
  EmailSubject,
  EmailTemplate,
  EmailTemplatePayload,
} from '../../../../../email';

import { Strapi } from '../../../strapi';
import { generateHtmlEmailContent } from './utils/generateHtmlEmailContent';

export type SendMailProps = {
  domain: string;
  template: keyof typeof EmailTemplate;
  payload: EmailTemplatePayload[keyof typeof EmailTemplate];
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postalCode?: string;
    city?: string;
  };
};

export const sendMail = async (data: SendMailProps) => {
  const { domain, recipient, template, payload } = data;

  const { attributes: landingPage } = await Strapi.getLandingPage(domain);

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
    replyTo: landingPage.contact_email ?? undefined,
    to: recipient.email,
    bcc: isCraftsman24(domain)
      ? 'leads@craftsman24.ch'
      : landingPage.contact_email ?? undefined,
    html,
  });
};

const isCraftsman24 = (host: string) => host.includes('craftsman24');
