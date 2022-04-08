import Script from 'next/script';
import { getCookieConsentValue } from 'react-cookie-consent';

import type { TrackingIds } from '../backend-api';
import { isDevEnvironment } from '../utils/isDevEnvironment';
import { isTestEnvironment } from '../utils/isTestEnvironment';
import { COOKIE_CONSENT_NAME } from './CookieConsent';

export const TrackingScripts: React.FunctionComponent<{
  ids?: TrackingIds;
  host: string;
}> = ({ ids, host }) => {
  if (!ids || !isTrackingAllowed(host)) return <></>;

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

export const sendConversionToGoogle = (
  host: string,
  adsId: string,
  conversionId: string,
) => {
  if (!isTrackingAllowed(host)) return;

  gtag('event', 'conversion', { send_to: `${adsId}/${conversionId}` });
};

const isTrackingAllowed = (host: string) =>
  getCookieConsentValue(COOKIE_CONSENT_NAME as string) === 'true' &&
  !isDevEnvironment(host) &&
  !isTestEnvironment();
