import type { NextApiRequest } from 'next';

import type {
  ContactData,
  QuestionnaireItem,
} from '../../context/Questionnaire/state';
import type { DefaultApiRouteResponse } from '../../lib/api/response';
import { ErrorType, newServerError } from '../../lib/api/error';
import { NextAPI } from '../../lib/api/request';
import { PipedriveAPI } from '../../interface/pipedrive';
import { StrapiAPI } from '../../interface/backend';
import { EmailTemplate } from '../../config/emails.config';
import { createHTMLTable } from '../../utils/createHTMLTable';

export interface CreateLeadRequestBody {
  domain?: string;
  contact?: ContactData;
  questionnaire?: QuestionnaireItem[];
}

interface CreateLeadApiRequest extends NextApiRequest {
  body: CreateLeadRequestBody;
}

export const handler = async (
  req: CreateLeadApiRequest,
  res: DefaultApiRouteResponse,
) => {
  try {
    if (req.method !== 'POST')
      return newServerError(res, ErrorType.UNSUPPORTED_METHOD);

    // if (req.query.API_ROUTE !== process.env.NEXT_PUBLIC_API_ROUTE)
    //   return newServerError(res, ErrorType.NOT_AUTHORIZED);

    const host = req.headers.host;
    const contactData = req.body.contact;
    const questionnaire = req.body.questionnaire;
    if (!host || !contactData || !questionnaire?.length)
      return newServerError(res, ErrorType.UNPROCESSABLE_ENTITY);

    const token = await StrapiAPI.getPipedriveAPITokenByDomain(host);
    if (!token) return newServerError(res, ErrorType.NOT_AUTHORIZED);

    const person =
      (await PipedriveAPI.getPersonByEmail(token, contactData.email.value)) ??
      (await PipedriveAPI.createPersonWithCustomPostalCodeField(token, {
        contactData,
      }));

    const lead = await PipedriveAPI.createLead(token, {
      person_id: person.id,
      title: `${person.name} (${host})`,
    });

    await Promise.all([
      await PipedriveAPI.createNote(token, {
        lead_id: lead.id,
        content: createHTMLTable(questionnaire),
      }),
      await NextAPI.sendMail({
        domain: host,
        template: EmailTemplate.Confirmation,
        payload: { questionnaire },
        recipient: {
          firstName: contactData.firstName.value,
          lastName: contactData.lastName.value,
          email: contactData.email.value,
        },
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
};

export default handler;
