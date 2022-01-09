import Head from 'next/head';
import { DefaultTheme } from 'styled-components';
import { FontConfig } from '../config/font.config';

export const HeadMeta = ({
  theme,
  brand,
}: {
  theme: DefaultTheme;
  brand: string | undefined;
}) => {
  const { primary } = theme.colors;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="screen-orientation" content="portrait" />

      {/* Android */}
      <meta name="theme-color" content={primary} />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={brand} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Windows */}
      <meta name="msapplication-navbutton-color" content={primary} />
      <meta name="msapplication-TileColor" content={primary} />
      <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />

      {/* Pinned Sites */}
      <meta name="application-name" content={brand} />
      <meta name="msapplication-starturl" content="/" />

      {/* Fonts */}
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
  );
};
