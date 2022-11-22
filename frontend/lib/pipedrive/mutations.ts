import { Pipedrive } from '.';

import type { QuestionnaireState } from '../../features/Questionnaire';
import type { FieldType } from './model';

export const createPersonField = async (
  token: string,
  data: { name: string; type: FieldType },
) => {
  const res = await Pipedrive.instance.post(
    '/personFields',
    {
      name: data.name,
      field_type: data.type,
    },
    {
      params: { api_token: token },
    },
  );

  if (!res.data.success)
    throw new Error('Error while creating new person field.');

  return res.data.data;
};

export const createPerson = async (
  token: string,
  data: QuestionnaireState['contact'] & {
    customFields: { [key: string]: string | undefined };
  },
) => {
  const res = await Pipedrive.instance.post(
    '/persons',
    {
      ...data.customFields,
      name: `${data.firstName} ${data.lastName}`,
      phone: [{ value: data.phone, primary: true, label: 'Telefon' }],
      email: [{ value: data.email, primary: true, label: 'Email' }],
    },
    {
      params: { api_token: token },
    },
  );

  if (!res.data.success) throw new Error('Error while creating new person.');

  return res.data.data;
};

export const createPersonWithCustomPostalCodeField = async (
  token: string,
  data: { contactData: QuestionnaireState['contact'] },
) => {
  const postalCodeField = await Pipedrive.getCustomPostalCodeField(token, {
    fieldLabel: 'Postleitzahl',
  });

  return await createPerson(token, {
    ...data.contactData,
    customFields: {
      [postalCodeField.key]: data.contactData.postalCode,
    },
  });
};

export const createLead = async (
  token: string,
  data: { title: string; person_id: number },
) => {
  const res = await Pipedrive.instance.post(
    '/leads',
    {
      title: data.title,
      person_id: data.person_id,
    },
    {
      params: { api_token: token },
    },
  );

  if (!res.data.success) throw new Error('Error while creating new lead.');

  return res.data.data;
};

export const createNote = async (
  token: string,
  data: { lead_id: string; content: string },
) => {
  const res = await Pipedrive.instance.post(
    '/notes',
    {
      lead_id: data.lead_id,
      content: data.content,
    },
    {
      params: { api_token: token },
    },
  );

  if (!res.data.success) throw new Error('Error while creating new note.');

  return res.data.data;
};
