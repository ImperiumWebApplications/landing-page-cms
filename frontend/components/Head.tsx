import NextHead from 'next/head';
import { DefaultTheme } from 'styled-components';

export const Head = ({
  theme,
  brand,
}: {
  theme: DefaultTheme;
  brand: string | null | undefined;
}) => {
  const { primary } = theme.colors;
  const name = brand ?? undefined;
  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="screen-orientation" content="portrait" />

      {/* Android */}
      <meta name="theme-color" content={primary} />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Windows */}
      <meta name="msapplication-navbutton-color" content={primary} />
      <meta name="msapplication-TileColor" content={primary} />
      <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />

      {/* Pinned Sites */}
      <meta name="application-name" content={name} />
      <meta name="msapplication-starturl" content="/" />
    </NextHead>
  );
};
