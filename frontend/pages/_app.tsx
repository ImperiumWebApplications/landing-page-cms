import type { AppProps } from 'next/app';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
