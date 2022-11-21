export const populateMarkdownTemplate = (
  template?: string | null,
  data?: Record<string, unknown>,
) => {
  if (!template || !data) return;

  const regex = /\${([^{}]+)}/g; // ${client_address}
  const fields = template.match(regex);

  let populatedTemplate = template;

  fields?.forEach((field) => {
    const fieldName = field.slice(2, -1); // client_address
    const value = data[fieldName];
    if (typeof value === 'string') {
      const regex = new RegExp(escapeString(field), 'g');
      populatedTemplate = populatedTemplate.replace(regex, value);
    }
  });

  return populatedTemplate;
};

const escapeString = (str: string) =>
  (str + '').replace(/[\\"${}']/g, '\\$&').replace(/\u0000/g, '\\0');
