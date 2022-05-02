import TagManager from 'react-gtm-module';

import { TrackingEvents } from './initAnalytics';
import { isTrackingAllowed } from './isTrackingAllowed';

export const sendConversionToAnalytics = (host: string) => {
  if (isTrackingAllowed(host))
    TagManager.dataLayer({
      dataLayer: { event: TrackingEvents.QuestionnaireSubmitted },
    });
};
