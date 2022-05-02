import React from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';

import {
  CookiesAllowed,
  COOKIE_CONSENT_NAME,
} from '../components/CookieConsent';

export const useCookieConsent = () => {
  const cookieConsent = getCookieConsentValue(COOKIE_CONSENT_NAME as string);
  return React.useState<CookiesAllowed>(
    cookieConsent === 'true'
      ? 'Yes'
      : cookieConsent === 'false'
      ? 'No'
      : 'NotAnswered',
  );
};
