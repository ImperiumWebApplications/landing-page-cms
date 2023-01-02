import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { compile } from 'handlebars';
import mjml2html from 'mjml';

import type { LandingPage } from '../../../../strapi';
import type { SendMailProps } from '../send-mail';
import {
  EmailTemplate,
  EmailTemplateContext,
  EmailTemplatePayload,
} from '../../../../../../email';
import { formatAppointmentsDate } from '../../../../../features/Appointment/utils/formatAppointmentsDate';

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
    city?: string;
  };
  landingPage: LandingPage;
  template: keyof typeof EmailTemplate;
  content: EmailTemplatePayload[keyof typeof EmailTemplate];
}) => {
  const templateDirectory = resolve(process.cwd(), 'email', 'templates');
  const templateFileName = `${template.toLowerCase()}.mjml`;
  const templateFilePath = join(templateDirectory, templateFileName);

  if (!existsSync(templateFilePath))
    throw new Error('Missing template for sending mail.');

  const templateString = readFileSync(templateFilePath, 'utf8');
  const hbsTemplate = compile(templateString);

  const context: EmailTemplateContext[EmailTemplate] = {
    logoUrl: landingPage?.logo?.data.attributes?.url,
    firstName: recipient?.firstName ?? '',
    lastName: recipient?.lastName ?? '',
    colorPrimary: landingPage?.color_primary ?? '#000000',
    colorText: landingPage?.color_text ?? '#737373',
    questionnaire: content?.questionnaire,
    appointments: formatAppointmentsDates(content?.appointments),
    phone: recipient.phone,
    postalCode: recipient.postalCode,
    city: recipient.city,
  };

  const compiledTemplate = hbsTemplate(context);
  const { html, errors } = mjml2html(compiledTemplate);

  if (errors.length || !compiledTemplate)
    throw new Error('Error while generating mail template.');

  return html;
};

const formatAppointmentsDates = (
  appointments: SendMailProps['payload']['appointments'],
) => {
  return appointments?.map((appointment) => ({
    ...appointment,
    date: formatAppointmentsDate({
      date: appointment.date,
      duration: appointment.duration,
    }),
  }));
};
