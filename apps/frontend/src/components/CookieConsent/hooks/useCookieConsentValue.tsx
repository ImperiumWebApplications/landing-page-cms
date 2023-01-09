import { useState } from 'react';

import { getCookieConsentValue } from 'react-cookie-consent';
import { CookiesAllowed, COOKIE_CONSENT_NAME } from '../CookieConsent';

export const useCookieConsentValue = () => {
  const cookieConsent = getCookieConsentValue(COOKIE_CONSENT_NAME as string);
  return useState<CookiesAllowed>(
    cookieConsent === 'true'
      ? 'Yes'
      : cookieConsent === 'false'
      ? 'No'
      : 'NotAnswered',
  );
};
