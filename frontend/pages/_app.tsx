import type { AppProps } from 'next/app';
import 'intersection-observer';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';

import '../styles/global.css';

// import { isTestEnvironment } from '../utils/isTestEnvironment';

// if (isTestEnvironment()) {
//   (async () => {
//     const { StrapiMockHandlers } = await import('../mocks/lib/strapi/api');
//     const { startAPIMockServer } = await import('../mocks/utils/mock-rest-api');
//     await startAPIMockServer(StrapiMockHandlers);
//   })();
// }

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
