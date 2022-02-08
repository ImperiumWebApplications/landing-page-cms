import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { compile } from 'handlebars';
import { createTransport } from 'nodemailer';
import mjml2html from 'mjml';
import type { NextApiRequest } from 'next';

import type { DefaultApiRouteResponse } from '../../lib/api/response';
import { ErrorType, newServerError } from '../../lib/api/error';
import { StrapiAPI } from '../../interface/backend';
import {
  EmailSubject,
  EmailTemplate,
  EmailTemplateContext,
  EmailTemplatePayload,
} from '../../config/emails.config';

export interface SendMailRequestBody {
  domain?: string;
  template?: keyof typeof EmailTemplate;
  payload?: EmailTemplatePayload[keyof typeof EmailTemplate];
  recipient?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

interface SendMailApiRequest extends NextApiRequest {
  body: SendMailRequestBody;
}

export const handler = async (
  req: SendMailApiRequest,
  res: DefaultApiRouteResponse,
) => {
  try {
    if (req.method !== 'POST')
      return newServerError(res, ErrorType.UNSUPPORTED_METHOD);

    if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE)
      return newServerError(res, ErrorType.NOT_AUTHORIZED);

    if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const { domain, template, recipient, payload } = req.body;

    if (!domain || !template || !recipient?.email)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    if (template === EmailTemplate.Confirmation && !payload?.questionnaire)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const landingPage = await StrapiAPI.getLandingPageStyleByDomain(domain);

    if (!landingPage?.brand_name || !landingPage.logo_header?.data.attributes)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const templateDirectory = resolve(process.cwd(), 'email');
    const templateFileName = `${template.toLowerCase()}.mjml`;
    const templateFilePath = join(templateDirectory, templateFileName);

    if (!existsSync(templateFilePath))
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const templateString = readFileSync(templateFilePath, 'utf8');
    const hbsTemplate = compile(templateString);

    const context = {
      firstName: recipient.firstName ?? '',
      lastName: recipient.lastName ?? '',
      logoUrl: landingPage.logo_header.data.attributes.url,
      colorPrimary: landingPage.color_primary ?? '#000000',
      colorText: landingPage.color_text ?? '#737373',
      questionnaire: payload?.questionnaire,
    } as EmailTemplateContext[EmailTemplate];

    const { html, errors } = mjml2html(hbsTemplate(context));

    if (errors.length)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

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
      to: recipient.email,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
};

export default handler;
