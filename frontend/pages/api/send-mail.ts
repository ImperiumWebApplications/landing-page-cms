import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { compile } from 'handlebars';
import { createTransport } from 'nodemailer';
import mjml2html from 'mjml';
import type { NextApiRequest } from 'next';
import { withSentry } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';

import type { LandingPage } from '../../backend-api';
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
    phone?: string;
    postalCode?: string;
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
    const { data, error: retrieveDataError } = retrieveDataFromRequestBody(req);
    if (!data) return newServerError(res, retrieveDataError);

    const { domain, recipient, template, payload } = data;

    const landingPage = await StrapiAPI.getLandingPageStyleByDomain(domain);
    if (!landingPage?.brand_name || !landingPage.logo_header?.data.attributes) {
      Sentry.captureMessage('Missing data to send valid email.', {
        level: Sentry.Severity.Error,
        tags: { interface: 'APIRoute' },
      });
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);
    }

    const { html, error: generateHtmlError } = generateHtmlEmailContent({
      recipient,
      landingPage,
      template,
      content: payload,
    });

    if (!html) return newServerError(res, generateHtmlError);

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

    return res.status(200).json({ success: true });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'APIRoute' },
    });
    return res.status(500).json({ success: false });
  }
};

export default withSentry(handler);

/**
 *
 * HELPER FUNCTIONS
 *
 */

export const generateHtmlEmailContent = ({
  recipient,
  landingPage,
  template,
  content,
}: {
  recipient: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    postalCode?: string;
  };
  landingPage: LandingPage;
  template: keyof typeof EmailTemplate;
  content: EmailTemplatePayload[keyof typeof EmailTemplate];
}) => {
  try {
    const templateDirectory = resolve(process.cwd(), 'email');
    const templateFileName = `${template.toLowerCase()}.mjml`;
    const templateFilePath = join(templateDirectory, templateFileName);

    if (!existsSync(templateFilePath)) {
      Sentry.captureMessage('Missing template for sending mail.', {
        level: Sentry.Severity.Error,
        tags: { interface: 'APIRoute' },
      });
      return { html: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
    }

    const templateString = readFileSync(templateFilePath, 'utf8');
    const hbsTemplate = compile(templateString);

    const context: EmailTemplateContext[EmailTemplate] = {
      logoUrl: landingPage?.logo_header?.data.attributes.url,
      firstName: recipient?.firstName ?? '',
      lastName: recipient?.lastName ?? '',
      colorPrimary: landingPage?.color_primary ?? '#000000',
      colorText: landingPage?.color_text ?? '#737373',
      questionnaire: content?.questionnaire,
      phone: recipient.phone,
      postalCode: recipient.postalCode,
    };

    const compiledTemplate = hbsTemplate(context);
    const { html, errors } = mjml2html(compiledTemplate);

    if (errors.length || !compiledTemplate) {
      Sentry.captureMessage('Error while generating mail template.', {
        level: Sentry.Severity.Warning,
        extra: { mjmlError: errors },
        tags: { interface: 'APIRoute' },
      });
      return { html: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
    }

    return { html, error: undefined };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { interface: 'APIRoute' },
    });
    return { html: undefined };
  }
};

export const retrieveDataFromRequestBody = (req: SendMailApiRequest) => {
  if (req.method !== 'POST')
    return { data: undefined, error: ErrorType.UNSUPPORTED_METHOD };

  if (req.query.PRIVATE_API_ROUTE !== process.env.PRIVATE_API_ROUTE) {
    Sentry.captureMessage('Missing or invalid private API route query param.', {
      level: Sentry.Severity.Error,
      tags: { interface: 'APIRoute' },
    });
    return { data: undefined, error: ErrorType.NOT_AUTHORIZED };
  }

  if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
    Sentry.captureMessage('Missing login data for email transport.', {
      level: Sentry.Severity.Error,
      tags: { interface: 'APIRoute' },
    });
    return { data: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
  }

  const { domain, template, recipient, payload } = req.body;

  if (!domain || !template || !recipient?.email) {
    Sentry.captureMessage('Missing data to send valid email.', {
      level: Sentry.Severity.Error,
      tags: { interface: 'APIRoute' },
    });
    return { data: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
  }

  if (template === EmailTemplate.Confirmation) {
    if (!!payload?.questionnaire) {
      return {
        data: { domain, template, recipient, payload },
        error: undefined,
      };
    } else {
      Sentry.captureMessage('Missing data to send valid email.', {
        level: Sentry.Severity.Error,
        tags: { interface: 'APIRoute' },
      });
      return { data: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
    }
  }

  return { data: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
};
