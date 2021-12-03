import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';
import { LandingPage } from '../backend-api';
import { extractSeoProps } from '../config/seo.config';
import { extractTheme, GlobalStyle } from '../config/theme.config';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FunctionComponent<{ content: LandingPage }> = ({
  children,
  content,
}) => {
  return (
    <ThemeProvider theme={extractTheme(content)}>
      <GlobalStyle />
      <NextSeo {...extractSeoProps(content)} />
      <Header content={content} />
      <main>{children}</main>
      <Footer content={content} />
    </ThemeProvider>
  );
};
