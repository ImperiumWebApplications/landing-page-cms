import type { TrackingIds } from '../../backend-api';
import { isTrackingAllowed } from './isTrackingAllowed';

export const sendConversionToAnalytics = (
  host: string,
  tracking: TrackingIds,
) => {
  if (!isTrackingAllowed(host)) return;

  if (tracking.google_ads_id && tracking.google_ads_conversion_id)
    gtag('event', 'conversion', {
      send_to: `${tracking.google_ads_id}/${tracking.google_ads_conversion_id}`,
    });

  if (tracking.google_analytics_id)
    gtag('event', 'submit', { event_category: 'Configurator' });
};
