import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { Layout } from '../components/Layout';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
export default MyApp;
