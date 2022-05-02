import TagManager from 'react-gtm-module';

import { TrackingEvents } from './initAnalytics';

export const sendEventToAnalytics = (
  event: typeof TrackingEvents['QuestionnaireSubmitted'],
) => {
  TagManager.dataLayer({ dataLayer: { event } });
};
