import { isTrackingAllowed } from './isTrackingAllowed';

export const sendPageViewToAnalytics = (
  host: string,
  analyticsId: string | undefined,
  url: string,
) => {
  if (isTrackingAllowed(host) && analyticsId)
    gtag('config', analyticsId, { page_path: url });
};
