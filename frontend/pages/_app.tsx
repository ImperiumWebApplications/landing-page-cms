import type { AppProps } from 'next/app';
import 'intersection-observer';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';
import '@fontsource/overpass';
import '@fontsource/overpass/700.css';

import { isTestEnvironment } from '../utils/isTestEnvironment';

if (isTestEnvironment()) {
  (async () => {
    const { backendAPIMockHandlers } = await import('../mocks/backend-api');
    const { startAPIMockServer } = await import('../mocks/utils/mock-rest-api');
    await startAPIMockServer(backendAPIMockHandlers);
  })();
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
