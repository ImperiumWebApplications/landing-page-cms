import { TrackingIds } from '../../backend-api';

export const generateGoogleTagManagerScript = (ids: TrackingIds) => {
  let script =
    "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); ";
  if (ids.google_ads_id) script += `gtag('config', '${ids.google_ads_id}'); `;
  if (ids.google_analytics_id)
    script += `gtag('config', '${ids.google_analytics_id}', { anonymize_ip: true });`;
  return script;
};
