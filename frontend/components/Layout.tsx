import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';

import type { LandingPage } from '../backend-api';
import type { CookieConsentProps } from '../components/CookieConsent';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeadMeta } from './HeadMeta';
import { extractSeoProps } from '../config/seo.config';
import { extractTheme, GlobalStyle } from '../config/theme.config';
import { isFunnelRoute } from '../utils/isFunnelRoute';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { TagManager } from '../lib/analytics/TagManager';
import {
  sendEventToAnalytics,
  TagManagerEvents,
} from '../lib/analytics/sendEventToAnalytics';

const ClientSideOnlyCookieConsent = dynamic<CookieConsentProps>(
  () => import('../components/CookieConsent').then((mod) => mod.CookieConsent),
  { ssr: false },
);

export const Layout: React.FunctionComponent<{ content: LandingPage }> = ({
  children,
  content,
}) => {
  const [allowCookies, setAllowCookies] = useCookieConsent();
  const router = useRouter();

  React.useEffect(() => {
    const { ConsentGranted, ConsentDenied } = TagManagerEvents;
    if (allowCookies === 'Yes') sendEventToAnalytics(ConsentGranted);
    else sendEventToAnalytics(ConsentDenied);
  }, [allowCookies]);

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
      <TagManager id={content.google_tag_manager_id} host={content.domain} />
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
