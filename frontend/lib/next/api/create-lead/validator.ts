import { NextApiRequest } from 'next';

import type { AppointmentState } from '../../../../features/Appointment/context/Appointment';
import type { QuestionnaireAnswer } from '../../../../features/Questionnaire';
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
    appointmentRequests?: (AppointmentState['dates'] &
      AppointmentState['location'])[];
    questionnaireResults?: QuestionnaireAnswer[];
  };
}

export const validateRequestBody = (
  req: CreateLeadRequest,
): CreateLeadProps => {
  try {
    if (req.method !== 'POST') throw new Error('Unsupported HTTP method.');

    if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE)
      throw new Error('Missing or invalid public API route query param.');

    const domain = normalizeHostname(req.body.domain ?? req.headers?.host);
    if (!domain) throw new Error('No domain provided.');

    const contact = req.body.contact;
    const questionnaireResults = req.body.questionnaireResults?.map(
      ({ question, answer }) => ({
        question: question.value,
        answer: answer.value,
      }),
    );

    if (!isContactDataComplete(contact) || !questionnaireResults?.length)
      throw new Error('Missing or invalid form data.');

    return { domain, contact, questionnaireResults };
  } catch (error) {
    throw error;
  }
};

const isContactDataComplete = (
  data: CreateLeadRequest['body']['contact'],
): data is CreateLeadProps['contact'] => {
  if (!data?.email) return false;
  if (!data?.lastName) return false;
  if (!data?.firstName) return false;
  if (!data?.phone) return false;
  if (!data?.salutation) return false;
  return true;
};
