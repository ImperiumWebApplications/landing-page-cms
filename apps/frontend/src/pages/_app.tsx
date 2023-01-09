import React from 'react';

import type { AppProps } from 'next/app';
import 'intersection-observer';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';

import '../styles/global.css';

import { isTestEnvironment } from '../utils/isTestEnvironment';

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

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
