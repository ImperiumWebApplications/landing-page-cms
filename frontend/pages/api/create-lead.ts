import type { NextApiRequest } from 'next';
import { withSentry } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';

import type {
  ContactData,
  QuestionnaireItem,
} from '../../context/Questionnaire/state';
import type { PostalCodeDetails } from './postal-codes/[id]';
import type { DefaultApiRouteResponse } from '../../lib/api/response';
import { ErrorType, newServerError } from '../../lib/api/error';
import { NextAPI } from '../../lib/api/request';
import { PipedriveAPI } from '../../interface/pipedrive';
import { StrapiAPI } from '../../interface/backend';
import { EmailTemplate } from '../../config/emails.config';
import { createHTMLTable } from '../../utils/createHTMLTable';
import { normalizeHostname } from '../../utils/normalizeHostname';

export interface CreateLeadRequestBody {
  domain?: string;
  contact?: ContactData;
  questionnaire?: QuestionnaireItem[];
}

export interface CreateLeadApiRequest extends NextApiRequest {
  body: CreateLeadRequestBody;
}

export const handler = async (
  req: CreateLeadApiRequest,
  res: DefaultApiRouteResponse,
) => {
  try {
    const { data, error } = retrieveDataFromRequestBody(req);
    if (!data) return newServerError(res, error);

    const token = await StrapiAPI.getPipedriveAPITokenByDomain(data.host);
    if (!token) return newServerError(res, ErrorType.NOT_AUTHORIZED);

    data.contactData.postalCode.value = await enrichPostalCodeValue(data);

    const person =
      (await PipedriveAPI.getPersonByEmail(
        token,
        data.contactData.email.value,
      )) ??
      (await PipedriveAPI.createPersonWithCustomPostalCodeField(token, {
        contactData: data.contactData,
      }));

    const lead = await PipedriveAPI.createLead(token, {
      person_id: person.id,
      title: `${person.name} (${data.host})`,
    });

    await Promise.all([
      await PipedriveAPI.createNote(token, {
        lead_id: lead.id,
        content: createHTMLTable(data.questionnaire),
      }),
      await NextAPI.sendMail({
        domain: data.host,
        template: EmailTemplate.Confirmation,
        payload: { questionnaire: data.questionnaire },
        recipient: {
          firstName: data.contactData.firstName.value,
          lastName: data.contactData.lastName.value,
          email: data.contactData.email.value,
          phone: data.contactData.phone.value,
          postalCode: data.contactData.postalCode.value,
        },
      }),
    ]);

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

export const retrieveDataFromRequestBody = (req: CreateLeadApiRequest) => {
  if (req.method !== 'POST')
    return { data: undefined, error: ErrorType.UNSUPPORTED_METHOD };

  if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE) {
    Sentry.captureMessage('Missing or invalid public API route query param.', {
      level: Sentry.Severity.Error,
      tags: { interface: 'APIRoute' },
    });
    return { data: undefined, error: ErrorType.NOT_AUTHORIZED };
  }

  const host = normalizeHostname(req.headers.host);
  const contactData = req.body.contact;
  const questionnaire = req.body.questionnaire;

  if (!host || !contactData || !questionnaire?.length) {
    Sentry.captureMessage('Missing or invalid form data.', {
      level: Sentry.Severity.Warning,
      tags: { interface: 'APIRoute' },
    });
    return { data: undefined, error: ErrorType.UNPROCESSABLE_ENTITY };
  }

  return { data: { host, contactData, questionnaire }, error: undefined };
};

export const enrichPostalCodeValue = async (data: {
  host: string;
  contactData: ContactData;
  questionnaire: QuestionnaireItem[];
}) => {
  const postalCodeData = (
    await (
      await NextAPI.getPostalCodeDetails({
        domain: data.host,
        code: data.contactData.postalCode.value,
      })
    ).json()
  ).data as PostalCodeDetails | undefined;

  if (!postalCodeData) return data.contactData.postalCode.value;

  return `${postalCodeData.code} (${postalCodeData.community})`;
};
