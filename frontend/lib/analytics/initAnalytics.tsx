import React from 'react';
import TagManager from 'react-gtm-module';

import { GoogleTagManagerId } from '../../backend-api';
import { isTrackingAllowed } from './isTrackingAllowed';
import { ConsentConfig, setConsentConfig } from './setConsentConfig';

export const TrackingEvents = {
  QuestionnaireSubmitted: {
    key: 'questionnaire_submitted',
    label: 'Questionnaire Submitted',
  },
} as const;

export const useAnalytics = (host: string, tagId?: GoogleTagManagerId) => {
  const tagManagerArgs = (tagId: string) => ({
    gtmId: tagId,
    dataLayer: setConsentConfig('consent', 'default', ConsentConfig.Default),
    events: Object.values(TrackingEvents).reduce(
      (prev, event) => ({ ...prev, [event.key]: event.label }),
      {},
    ),
  });

  React.useEffect(() => {
    if (tagId && isTrackingAllowed(host))
      TagManager.initialize(tagManagerArgs(tagId));
  }, [host, tagId]);
};
