import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { getCookieConsentValue } from 'react-cookie-consent';
import { ThemeProvider } from 'styled-components';

import type { LandingPage } from '../backend-api';
import {
  CookieConsentProps,
  CookiesAllowed,
  COOKIE_CONSENT_NAME,
} from '../components/CookieConsent';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeadMeta } from './HeadMeta';
import { extractSeoProps } from '../config/seo.config';
import { extractTheme, GlobalStyle } from '../config/theme.config';
import { isFunnelRoute } from '../utils/isFunnelRoute';
import { useAnalytics } from '../lib/analytics/initAnalytics';

const ClientSideOnlyCookieConsent = dynamic<CookieConsentProps>(
  () => import('../components/CookieConsent').then((mod) => mod.CookieConsent),
  { ssr: false },
);

export const Layout: React.FunctionComponent<{ content: LandingPage }> = ({
  children,
  content,
}) => {
  const router = useRouter();
  const cookieConsent = getCookieConsentValue(COOKIE_CONSENT_NAME as string);
  const [allowCookies, setAllowCookies] = React.useState<CookiesAllowed>(
    cookieConsent === 'true'
      ? 'Yes'
      : cookieConsent === 'false'
      ? 'No'
      : 'NotAnswered',
  );

  useAnalytics(content.domain, content.google_tag_manager_id);

  // https://github.com/styled-components/styled-components/issues/730#issuecomment-347077307
  React.useEffect(() => {
    const isCookieModalOpen = allowCookies === 'NotAnswered';
    if (isCookieModalOpen) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'auto';
  });

  return (
    <ThemeProvider theme={extractTheme(content)}>
      <GlobalStyle isFunnelRoute={isFunnelRoute(router)} />
      <NextSeo {...extractSeoProps(content)} />
      <HeadMeta theme={extractTheme(content)} brand={content.brand_name} />
      <Header content={content} />
      <main>{children}</main>
      <Footer content={content} />
      <ClientSideOnlyCookieConsent
        consent={allowCookies}
        setConsent={setAllowCookies}
      />
    </ThemeProvider>
  );
};
