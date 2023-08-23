import { createTransport } from 'nodemailer';
import aws from 'aws-sdk';
import {
  EmailSubject,
  EmailTemplate,
  EmailTemplatePayload,
} from '../../../../../email';

import { Strapi } from '../../../strapi';
import { generateHtmlEmailContent } from './utils/generateHtmlEmailContent';
import sharp from 'sharp';

aws.config.update({
  region: 'eu-central-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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

  if (!landingPage?.brand_name || !landingPage.logo?.data?.attributes) {
    throw new Error('Missing data to send valid email.');
  }

  let logoUrl = landingPage.logo?.data?.attributes.url;
  const logoExt = landingPage.logo?.data?.attributes.ext;
  let attachments;
  const imageBuffer = await fetch(logoUrl).then((res) => res.arrayBuffer());
  const buffer = Buffer.from(imageBuffer);
  let convertedBuffer;
  let imageType = 'image/png';

  switch (logoExt) {
    case '.svg':
      convertedBuffer = await sharp(buffer).png().toBuffer();
      break;
    case '.jpg':
    case '.jpeg':
      convertedBuffer = await sharp(buffer).jpeg().toBuffer();
      imageType = 'image/jpeg';
      break;
    case '.gif':
      convertedBuffer = await sharp(buffer).gif().toBuffer();
      imageType = 'image/gif';
      break;
    default:
      convertedBuffer = buffer;
      break;
  }

  logoUrl = `data:${imageType};base64,${convertedBuffer.toString('base64')}`;
  attachments = [
    {
      filename: `logo${logoExt}`,
      content: convertedBuffer,
      cid: 'logo@cid',
    },
  ];

  const html = generateHtmlEmailContent({
    recipient,
    landingPage,
    logoUrl,
    template,
    content: payload,
  });

  const transporter = createTransport({
    SES: new aws.SES({
      apiVersion: '2010-12-01',
    }),
  });

  // To prospect
  await transporter.sendMail({
    subject: EmailSubject[template],
    attachments: attachments ?? undefined,
    from: `"${landingPage.brand_name}" <${process.env.MAIL_USER}>`,
    replyTo: landingPage.contact_email ?? undefined,
    to: recipient.email,
    html,
  });

  // To landing page contact
  if (landingPage.contact_email) {
    await transporter.sendMail({
      subject: EmailSubject[template],
      attachments: attachments ?? undefined,
      from: `"${landingPage.brand_name}" <${process.env.MAIL_USER}>`,
      to: landingPage.contact_email,
      html,
    });
  }
};
