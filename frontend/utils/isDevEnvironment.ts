export const isDevEnvironment = (host: string) =>
  process.env.NODE_ENV === 'development' ||
  host.includes('localhost:300') ||
  host.includes('staging.lq-pages.ch');
