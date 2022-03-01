import axios from 'restyped-axios';
import * as Sentry from '@sentry/nextjs';

import type { ContactData } from '../context/Questionnaire/state';
import type {
  FieldType,
  PipedriveAPI as PipedriveAPISchema,
} from '../pipedrive-api';
import { isPipedriveDataOK } from '../utils/isResponseOK';

const PIPEDRIVE_API = axios.create<PipedriveAPISchema>({
  baseURL: 'https://api.pipedrive.com/v1',
});

const capturePipedriveException = (error: unknown) => {
  Sentry.captureException(error, {
    tags: { interface: 'PipedriveAPI' },
  });
};

const getCurrentUser = async (token: string) => {
  try {
    const res = await PIPEDRIVE_API.get('/users/me', {
      params: { api_token: token },
    });

    if (!isPipedriveDataOK(res))
      throw new Error('Current user data is missing or malformed.');

    return res.data.data;
  } catch (error) {
    capturePipedriveException(error);
    throw error;
  }
};

const getPersonFields = async (token: string) => {
  try {
    const res = await PIPEDRIVE_API.get('/personFields', {
      params: { api_token: token },
    });

    if (!isPipedriveDataOK(res))
      throw new Error('Error while fetching for existing person fields.');

    return res.data.data;
  } catch (error) {
    capturePipedriveException(error);
    throw error;
  }
};

const getCustomPostalCodeField = async (
  token: string,
  formField: { fieldLabel: string },
) => {
  const fields = await getPersonFields(token);

  const existingPostalCodeField = fields.filter(
    (field) => field.name === formField.fieldLabel,
  )?.[0];

  return (
    existingPostalCodeField ??
    (await createPersonField(token, {
      name: formField.fieldLabel,
      type: 'text',
    }))
  );
};

const getPersonByEmail = async (token: string, email: string) => {
  try {
    const res = await PIPEDRIVE_API.get('/persons/search', {
      params: {
        api_token: token,
        term: email,
        fields: 'email',
        exact_match: true,
      },
    });

    if (!isPipedriveDataOK(res))
      throw new Error('Error while fetching for existing email addresses.');

    return res.data.data.items.length ? res.data.data.items[0].item : undefined;
  } catch (error) {
    capturePipedriveException(error);
    throw error;
  }
};

const createPersonField = async (
  token: string,
  data: { name: string; type: FieldType },
) => {
  try {
    const res = await PIPEDRIVE_API.post(
      '/personFields',
      {
        name: data.name,
        field_type: data.type,
      },
      {
        params: { api_token: token },
      },
    );

    if (!isPipedriveDataOK(res))
      throw new Error('Error while creating new person field.');

    return res.data.data;
  } catch (error) {
    capturePipedriveException(error);
    throw error;
  }
};

const createPerson = async (
  token: string,
  data: ContactData & { customFields: { [key: string]: string } },
) => {
  try {
    const res = await PIPEDRIVE_API.post(
      '/persons',
      {
        ...data.customFields,
        name: `${data.firstName.value} ${data.lastName.value}`,
        phone: [
          { value: data.phone.value, primary: true, label: data.phone.label },
        ],
        email: [
          { value: data.email.value, primary: true, label: data.email.label },
        ],
      },
      {
        params: { api_token: token },
      },
    );

    if (!isPipedriveDataOK(res))
      throw new Error('Error while creating new person.');

    return res.data.data;
  } catch (error) {
    capturePipedriveException(error);
    throw error;
  }
};

const createPersonWithCustomPostalCodeField = async (
  token: string,
  data: { contactData: ContactData },
) => {
  try {
    const postalCodeField = await getCustomPostalCodeField(token, {
      fieldLabel: data.contactData.postalCode.label,
    });
    return await createPerson(token, {
      ...data.contactData,
      customFields: {
        [postalCodeField.key]: data.contactData.postalCode.value,
      },
    });
  } catch (error) {
    capturePipedriveException(error);
    return Promise.reject();
  }
};

const createLead = async (
  token: string,
  data: { title: string; person_id: number },
) => {
  try {
    const res = await PIPEDRIVE_API.post(
      '/leads',
      {
        title: data.title,
        person_id: data.person_id,
      },
      {
        params: { api_token: token },
      },
    );

    if (!isPipedriveDataOK(res))
      throw new Error('Error while creating new lead.');

    return res.data.data;
  } catch (error) {
    capturePipedriveException(error);
    return Promise.reject();
  }
};

const createNote = async (
  token: string,
  data: { lead_id: string; content: string },
) => {
  try {
    const res = await PIPEDRIVE_API.post(
      '/notes',
      {
        lead_id: data.lead_id,
        content: data.content,
      },
      {
        params: { api_token: token },
      },
    );

    if (!isPipedriveDataOK(res))
      throw new Error('Error while creating new note.');

    return res.data.data;
  } catch (error) {
    capturePipedriveException(error);
    throw error;
  }
};

export const PipedriveAPI = {
  createLead,
  createNote,
  createPerson,
  createPersonField,
  createPersonWithCustomPostalCodeField,
  getCurrentUser,
  getCustomPostalCodeField,
  getPersonByEmail,
  getPersonFields,
};
