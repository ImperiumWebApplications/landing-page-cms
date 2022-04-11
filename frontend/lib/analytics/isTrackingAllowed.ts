import { getCookieConsentValue } from 'react-cookie-consent';

import { COOKIE_CONSENT_NAME } from '../../components/CookieConsent';
import { isDevEnvironment } from '../../utils/isDevEnvironment';
import { isTestEnvironment } from '../../utils/isTestEnvironment';

export const isTrackingAllowed = (host: string) =>
  getCookieConsentValue(COOKIE_CONSENT_NAME as string) === 'true' &&
  !isDevEnvironment(host) &&
  !isTestEnvironment();
