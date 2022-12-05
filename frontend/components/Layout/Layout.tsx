import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';

import type { LandingPage } from '../../lib/strapi';
import {
  sendEventToAnalytics,
  TagManager,
  TagManagerEvents,
} from '../../lib/analytics';

import type { CookieConsentProps } from '../CookieConsent/CookieConsent';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Head } from '../Head/Head';

import { extractSeoProps } from '../../config/seo.config';
import { configureTheme, GlobalStyle } from '../../config/theme.config';

import { isFunnelRoute } from '../../utils/isFunnelRoute';
import { useCookieConsent } from '../../hooks/useCookieConsent';

const ClientSideOnlyCookieConsent = dynamic<CookieConsentProps>(
  () =>
    import('../CookieConsent/CookieConsent').then((mod) => mod.CookieConsent),
  { ssr: false },
);

type LayoutProps = {
  content: LandingPage;
};

export const Layout: React.FC<LayoutProps> = ({ children, content }) => {
  const [allowCookies, setAllowCookies] = useCookieConsent();
  const router = useRouter();

  const theme = configureTheme({
    colors: {
      primary: content.color_primary,
      secondary: content.color_secondary,
      tertiary: content.color_tertiary,
      text: content.color_text,
    },
  });

  useEffect(() => {
    const { ConsentGranted, ConsentDenied } = TagManagerEvents;
    if (allowCookies === 'Yes') sendEventToAnalytics(ConsentGranted);
    else sendEventToAnalytics(ConsentDenied);
  }, [allowCookies]);

  useEffect(() => {
    const isCookieModalOpen = allowCookies === 'NotAnswered';
    if (isCookieModalOpen) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'auto';
  });

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        :root {
          --color-primary: ${theme.colors.primary};
          --color-secondary: ${theme.colors.secondary};
          --color-tertiary: ${theme.colors.tertiary};
          --color-gray: ${theme.colors.text};
        }
      `}</style>
      <GlobalStyle isFunnelRoute={isFunnelRoute(router)} />
      <NextSeo {...extractSeoProps(content)} />
      <Head theme={theme} brand={content.brand_name} />
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
