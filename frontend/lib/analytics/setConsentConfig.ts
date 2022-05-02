type ConsentConfigOptions = {
  ad_storage: 'denied' | 'granted';
  analytics_storage: 'denied' | 'granted';
};

export const ConsentConfig: Record<
  'Default' | 'Granted' | 'Denied',
  ConsentConfigOptions
> = {
  Default: {
    ad_storage: 'denied',
    analytics_storage: 'denied',
  },
  Granted: {
    ad_storage: 'granted',
    analytics_storage: 'granted',
  },
  Denied: {
    ad_storage: 'denied',
    analytics_storage: 'denied',
  },
} as const;

export const setConsentConfig = (
  ...args: [string, string, ConsentConfigOptions]
) => args;
