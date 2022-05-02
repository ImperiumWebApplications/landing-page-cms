declare global {
  interface Window {
    dataLayer: Record<'event', ValueOf<typeof TagManagerEvents>>[];
  }
}

export const TagManagerEvents = {
  QuestionnaireSubmitted: 'questionnaire_submitted',
  ConsentGranted: 'consent_granted',
  ConsentDenied: 'consent_denied',
} as const;

type ValueOf<T> = T[keyof T];

export const sendEventToAnalytics = (
  event: ValueOf<typeof TagManagerEvents>,
) => {
  if (typeof window !== 'undefined') window.dataLayer?.push({ event: event });
};
