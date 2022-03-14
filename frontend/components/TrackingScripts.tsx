import Script from 'next/script';
import { TrackingIds } from '../backend-api';

export const TrackingScripts: React.FunctionComponent<{
  ids?: TrackingIds;
  consent?: boolean;
}> = ({ consent, ids }) => {
  if (!consent || !ids || process.env.NODE_ENV !== 'production') return <></>;

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

export const sendConversionToGoogle = (adsId: string, conversionId: string) =>
  gtag('event', 'conversion', { send_to: `${adsId}/${conversionId}` });
