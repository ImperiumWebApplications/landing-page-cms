export const populateMarkdownTemplate = (
  template?: string,
  data?: Record<string, unknown>,
) => {
  if (!template || !data) return;

  const regex = /\${([^{}]+)}/g; // ${client_address}
  const fields = template.match(regex);

  let populatedTemplate = template;

  fields?.forEach((field) => {
    const fieldName = field.slice(2, -1); // client_address
    const value = data[fieldName];
    if (typeof value === 'string')
      populatedTemplate = populatedTemplate?.replaceAll?.(field, value);
  });

  return populatedTemplate;
};
