import { TrackingIds } from '../../../backend-api';
import { generateGoogleTagManagerScript } from '../generateGoogleTagManagerScript';

const defaultIds: TrackingIds = {
  id: 1,
  google_ads_conversion_id: '',
  google_ads_id: 'ADS_ID',
  google_analytics_id: 'UA_ID',
};

describe('generateGoogleTagManagerScript', () => {
  it('should return script with analytics and ads id', () => {
    expect(generateGoogleTagManagerScript(defaultIds)).toBe(
      `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'ADS_ID'); gtag('config', 'UA_ID', { anonymize_ip: true });`,
    );
  });

  it('should return script with analytics id', () => {
    expect(
      generateGoogleTagManagerScript({
        ...defaultIds,
        google_ads_id: undefined,
      }),
    ).toBe(
      `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA_ID', { anonymize_ip: true });`,
    );
  });

  it('should return script with ads id', () => {
    expect(
      generateGoogleTagManagerScript({
        ...defaultIds,
        google_analytics_id: undefined,
      }),
    ).toBe(
      `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'ADS_ID'); `,
    );
  });

  it('should return script with no id', () => {
    expect(
      generateGoogleTagManagerScript({
        ...defaultIds,
        google_analytics_id: undefined,
        google_ads_id: undefined,
      }),
    ).toBe(
      `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); `,
    );
  });
});
