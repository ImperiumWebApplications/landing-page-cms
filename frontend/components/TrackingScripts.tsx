import Script from 'next/script';

import type { TrackingIds } from '../backend-api';
import { generateGoogleTagManagerScript } from '../lib/analytics/generateGoogleTagManagerScript';
import { isTrackingAllowed } from '../lib/analytics/isTrackingAllowed';

export const TrackingScripts: React.FunctionComponent<{
  ids?: TrackingIds;
  host: string;
}> = ({ ids, host }) => {
  if (!ids || !isTrackingAllowed(host)) return <></>;

  const tagId = ids.google_analytics_id ?? ids.google_ads_id;
  if (!tagId) return <></>;

  return (
    <>
      <Script
        id="googleTagManagerSource"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
      />
      <Script
        id="googleTagManagerScript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: generateGoogleTagManagerScript(ids),
        }}
      />
    </>
  );
};
