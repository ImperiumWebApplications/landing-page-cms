import { Pipedrive } from '.';

export const getCurrentUser = async (token: string) => {
  const res = await Pipedrive.instance.get('/users/me', {
    params: { api_token: token },
  });

  if (!res.data.success)
    throw new Error('Current user data is missing or malformed.');

  return res.data.data;
};

export const getPersonFields = async (token: string) => {
  const res = await Pipedrive.instance.get('/personFields', {
    params: { api_token: token },
  });

  if (!res.data.success)
    throw new Error('Error while fetching for existing person fields.');

  return res.data.data;
};

export const getCustomPostalCodeField = async (
  token: string,
  formField: { fieldLabel: string },
) => {
  const fields = await getPersonFields(token);

  const existingPostalCodeField = fields.filter(
    (field: { name: string }) => field.name === formField.fieldLabel,
  )?.[0];

  if (existingPostalCodeField) return existingPostalCodeField;

  return await Pipedrive.createPersonField(token, {
    name: formField.fieldLabel,
    type: 'text',
  });
};

export const getPersonByEmail = async (token: string, email: string) => {
  const res = await Pipedrive.instance.get('/persons/search', {
    params: {
      api_token: token,
      term: email,
      fields: 'email',
      exact_match: true,
    },
  });

  if (!res.data.success)
    throw new Error('Error while fetching for existing email addresses.');

  return res.data.data.items.length ? res.data.data.items[0].item : undefined;
};
