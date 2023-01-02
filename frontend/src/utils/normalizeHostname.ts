export const normalizeHostname = (host?: string) => {
  if (!host) return undefined;
  return host.match(/^(www\.)/)?.length ? host.substring(4) : host;
};
