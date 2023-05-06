import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import type { LandingPage, StaticContent } from '../../lib/strapi';
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
import { useCookieConsentValue } from '../CookieConsent';

const CookieConsent = dynamic<CookieConsentProps>(
  () => import('../CookieConsent').then((mod) => mod.CookieConsent),
  { ssr: false },
);

type LayoutProps = {
  content: LandingPage;
  staticContent: StaticContent;
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  content,
  staticContent,
}) => {
  const [allowCookies, setAllowCookies] = useCookieConsentValue();

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
    <>
      <NextSeo {...extractSeoProps(content)} />
      <Head content={content} />
      <TagManager id={content.google_tag_manager_id} host={content.domain} />
      <Header content={content} staticContent={staticContent} />
      <main>{children}</main>
      <Footer content={content} staticContent={staticContent} />
      <CookieConsent
        consent={allowCookies}
        setConsent={setAllowCookies}
        staticContent={staticContent.cookie_consent_dialog}
      />
    </>
  );
};
