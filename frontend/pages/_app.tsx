import type { AppProps } from 'next/app';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';

if (process.env.APP_ENV === 'test') {
  await (await import('../mocks/backend-api')).startBackendAPIMockServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
