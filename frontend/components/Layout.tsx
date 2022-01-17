import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { LandingPage } from '../backend-api';
import { extractSeoProps } from '../config/seo.config';
import { extractTheme, GlobalStyle } from '../config/theme.config';
import { isFunnelRoute } from '../utils/isFunnelRoute';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeadMeta } from './HeadMeta';

export const Layout: React.FunctionComponent<{ content: LandingPage }> = ({
  children,
  content,
}) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={extractTheme(content)}>
      <GlobalStyle isFunnelRoute={isFunnelRoute(router)} />
      <NextSeo {...extractSeoProps(content)} />
      <HeadMeta theme={extractTheme(content)} brand={content.brand_name} />
      <Header content={content} />
      <main>{children}</main>
      <Footer content={content} />
    </ThemeProvider>
  );
};
