import axios from 'restyped-axios';

import type { ContactData } from '../context/Questionnaire/state';
import type { FieldType, PipedriveAPI } from '../pipedrive-api';
import { isPipedriveDataOK } from '../utils/isResponseOK';

export const PIPEDRIVE_API = axios.create<PipedriveAPI>({
  baseURL: 'https://api.pipedrive.com/v1',
});

export const getCurrentUser = async (token: string) => {
  try {
    const res = await PIPEDRIVE_API.get('/users/me', {
      params: { api_token: token },
    });
    return isPipedriveDataOK(res) ? res.data.data : Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPersonFields = async (token: string) => {
  try {
    const res = await PIPEDRIVE_API.get('/personFields', {
      params: { api_token: token },
    });
    return isPipedriveDataOK(res) ? res.data.data : Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCustomPostalCodeField = async (
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

export const getPersonByEmail = async (token: string, email: string) => {
  try {
    const res = await PIPEDRIVE_API.get('/persons/search', {
      params: {
        api_token: token,
        term: email,
        fields: 'email',
        exact_match: true,
      },
    });
    return isPipedriveDataOK(res)
      ? res.data.data.items.length
        ? res.data.data.items[0].item
        : undefined
      : Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const createPersonField = async (
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
    return isPipedriveDataOK(res) ? res.data.data : Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const createPerson = async (
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
    return isPipedriveDataOK(res) ? res.data.data : Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const createPersonWithCustomPostalCodeField = async (
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
    console.error(error);
    return Promise.reject();
  }
};

export const createLead = async (
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
    return isPipedriveDataOK(res) ? res.data.data : Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const createNote = async (
  token: string,
  data: { lead_id: string; content: string },
) => {
  try {
    console.log(data.content);
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
    console.log(res.data.data);
    return isPipedriveDataOK(res) ? res.data.data : Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
