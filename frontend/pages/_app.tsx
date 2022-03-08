import type { AppProps } from 'next/app';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';
import { backendAPIMockHandlers } from '../mocks/backend-api';

if (process.env.APP_ENV === 'test') {
  await (
    await import('../mocks/utils/mock-rest-api')
  ).startAPIMockServer(backendAPIMockHandlers);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
