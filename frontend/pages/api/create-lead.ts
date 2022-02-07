import type { NextApiRequest } from 'next';

import type {
  ContactData,
  QuestionnaireItem,
} from '../../context/Questionnaire/state';
import type { DefaultApiRouteResponse } from '../../lib/api/response';
import { pipedriveKeys } from '../../config/pipedrive.config';
import {
  createLead,
  createNote,
  createPersonWithCustomPostalCodeField,
  getPersonByEmail,
} from '../../interface/pipedrive';
import { ErrorType, newServerError } from '../../lib/api/error';
import { createHTMLForPipedriveLeadNote } from '../../config/templates.config';

interface CreateLeadApiRequest extends NextApiRequest {
  body: {
    contact?: ContactData;
    questionnaire?: QuestionnaireItem[];
  };
}

export const handler = async (
  req: CreateLeadApiRequest,
  res: DefaultApiRouteResponse,
) => {
  try {
    if (req.method !== 'POST')
      return newServerError(res, ErrorType.UNSUPPORTED_METHOD);

    if (req.query.API_ROUTE_QUERY !== process.env.NEXT_PUBLIC_API_ROUTE_QUERY)
      return newServerError(res, ErrorType.NOT_AUTHORIZED);

    const host = req.headers.host;
    const contactData = req.body.contact;
    const questionnaire = req.body.questionnaire;
    if (!host || !contactData || !questionnaire?.length)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const token = pipedriveKeys[host];
    if (!token) return newServerError(res, ErrorType.NOT_AUTHORIZED);

    const person =
      (await getPersonByEmail(token, contactData.email.value)) ??
      (await createPersonWithCustomPostalCodeField(token, { contactData }));

    const lead = await createLead(token, {
      person_id: person.id,
      title: `${person.name} von Landing Page Fragebogen`,
    });

    await createNote(token, {
      lead_id: lead.id,
      content: createHTMLForPipedriveLeadNote(questionnaire),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
};

export default handler;
