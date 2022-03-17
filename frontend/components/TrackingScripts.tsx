import Script from 'next/script';
import { getCookieConsentValue } from 'react-cookie-consent';

import type { TrackingIds } from '../backend-api';
import { COOKIE_CONSENT_NAME } from './CookieConsent';

export const TrackingScripts: React.FunctionComponent<{
  ids?: TrackingIds;
}> = ({ ids }) => {
  if (!ids) return <></>;

  const cookieConsent = getCookieConsentValue(COOKIE_CONSENT_NAME as string);
  if (cookieConsent !== 'true' || process.env.NODE_ENV !== 'production')
    return <></>;

  return (
    <>
      <Script
        id="googleTagManagerSource"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ids.google_ads_id}`}
      />
      <Script
        id="googleTagManagerScript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: generateGoogleTagManagerScript(ids.google_ads_id),
        }}
      />
    </>
  );
};

const generateGoogleTagManagerScript = (
  id: string,
) => `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`;

export const sendConversionToGoogle = (adsId: string, conversionId: string) => {
  const cookieConsent = getCookieConsentValue(COOKIE_CONSENT_NAME as string);
  if (cookieConsent !== 'true' || process.env.NODE_ENV !== 'production') return;
  gtag('event', 'conversion', { send_to: `${adsId}/${conversionId}` });
};
