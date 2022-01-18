import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { getCookieConsentValue } from 'react-cookie-consent';
import { ThemeProvider } from 'styled-components';

import type { LandingPage } from '../backend-api';
import {
  CookieConsentProps,
  COOKIE_CONSENT_NAME,
} from '../components/CookieConsent';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeadMeta } from './HeadMeta';
import { TrackingScripts } from './TrackingScripts';
import { extractSeoProps } from '../config/seo.config';
import { extractTheme, GlobalStyle } from '../config/theme.config';
import { isFunnelRoute } from '../utils/isFunnelRoute';

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
  const [allowCookies, setAllowCookies] = React.useState(
    cookieConsent && cookieConsent === 'true' ? true : false,
  );

  return (
    <ThemeProvider theme={extractTheme(content)}>
      <GlobalStyle isFunnelRoute={isFunnelRoute(router)} />
      <NextSeo {...extractSeoProps(content)} />
      <HeadMeta theme={extractTheme(content)} brand={content.brand_name} />
      <TrackingScripts consent={allowCookies} />
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
