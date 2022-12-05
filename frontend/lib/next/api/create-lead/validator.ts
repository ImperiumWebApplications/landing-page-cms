import { NextApiRequest } from 'next';

import type { CreateLeadProps } from './create-lead';

import { normalizeHostname } from '../../../../utils/normalizeHostname';

export interface CreateLeadRequest extends NextApiRequest {
  body: {
    domain?: string;
    contact?: {
      salutation?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      email?: string;
      postalCode?: string;
      city?: string;
    };
    appointmentRequests?: {
      date?: string;
      location?: string;
      duration?: number;
    }[];
    questionnaireResults?: {
      question?: string;
      answer?: string;
    }[];
  };
}

export const validateRequestBody = (
  req: CreateLeadRequest,
): CreateLeadProps => {
  if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

  if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE)
    throw new Error('Missing or invalid public API route query param.');

  const domain = normalizeHostname(req.body.domain ?? req.headers?.host);
  if (!domain) throw new Error('No domain provided.');

  const { contact, appointmentRequests, questionnaireResults } = req.body;

  if (
    isContactDataComplete(contact) &&
    hasAppointmentRequests(appointmentRequests)
  ) {
    return { domain, contact, appointmentRequests };
  }

  if (
    isContactDataComplete(contact) &&
    hasQuestionnaireResults(questionnaireResults)
  ) {
    return { domain, contact, questionnaireResults };
  }

  throw new Error('Missing or invalid form data.');
};

const isContactDataComplete = (
  data: CreateLeadRequest['body']['contact'],
): data is CreateLeadProps['contact'] => {
  if (!data?.email) return false;
  if (!data?.lastName) return false;
  if (!data?.firstName) return false;
  if (!data?.phone) return false;
  return true;
};

const hasQuestionnaireResults = (
  data: CreateLeadRequest['body']['questionnaireResults'],
): data is NonNullable<CreateLeadProps['questionnaireResults']> => {
  return (
    !!data?.length &&
    data.every((result) => !!result?.answer && !!result?.question)
  );
};

const hasAppointmentRequests = (
  data: CreateLeadRequest['body']['appointmentRequests'],
): data is NonNullable<CreateLeadProps['appointmentRequests']> => {
  return (
    !!data?.length &&
    data.every(
      (request) =>
        !!request?.date && !!request?.location && !!request?.duration,
    )
  );
};
