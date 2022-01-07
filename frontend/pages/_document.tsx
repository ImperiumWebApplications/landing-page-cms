import Document, {
  DocumentContext,
  DocumentInitialProps,
  Main,
  NextScript,
  Head,
  Html,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { FontConfig } from '../config/font.config';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          {FontConfig.useGoogleCDN ? (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
              />
              <link
                href={`https://fonts.googleapis.com/css2?family=${
                  FontConfig.fontName
                }:wght@${FontConfig.fontWeight.join(';')}&display=swap`}
                rel="stylesheet"
              />
            </>
          ) : undefined}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
