import React from 'react';

import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

import 'intersection-observer';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';

import '../styles/global.css';

import { isTestEnvironment } from '../utils/isTestEnvironment';
import { LanguageContext } from '../context/Language';
import { LandingPage, LandingPageLanguage } from '../lib/strapi';

if (isTestEnvironment()) {
  (async () => {
    const { StrapiMockHandlers } = await import('../../mocks/lib/strapi/api');
    const { S3MockHandlers } = await import('../../mocks/lib/aws/s3');
    const { startMockServer } = await import('../../mocks/utils/mock-rest-api');
    await startMockServer([...StrapiMockHandlers, ...S3MockHandlers]);
  })();
}

// suppress useLayoutEffect warnings when running outside a browser
if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

const sen = localFont({
  display: 'swap',
  variable: '--font-sen',
  preload: true,
  src: [
    {
      path: '../styles/fonts/Sen.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/Sen-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

function MyApp({ Component, pageProps }: AppProps<{ content?: LandingPage }>) {
  const language: LandingPageLanguage = pageProps.content?.language ?? 'German';
  let font;
  if (pageProps.content) {
    font = pageProps.content.selectfont;
  }

  console.log(`Font from _app.tsx is ${font}`);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font && font !== 'Default'
            ? font
            : sen.style.fontFamily};
        }
      `}</style>
      <LanguageContext.Provider value={{ language }}>
        <Component {...pageProps} />
      </LanguageContext.Provider>
    </>
  );
}

export default MyApp;
