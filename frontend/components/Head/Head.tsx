import NextHead from 'next/head';

import type { LandingPage } from '../../lib/strapi';

type HeadProps = {
  content?: LandingPage;
};

export const Head: React.FC<HeadProps> = ({ content }) => {
  const name = content?.brand_name ?? undefined;

  const theme = {
    primary: content?.color_primary ?? '#000000',
    secondary: content?.color_secondary ?? '#2E2E2E',
    tertiary: content?.color_tertiary ?? '#E2E2E2',
    text: content?.color_text ?? '#222222',
  };

  return (
    <NextHead>
      {/* Inject Tailwind Theme */}
      <style>{`
        :root {
          --color-primary: ${theme.primary ?? '#000000'};
          --color-secondary: ${theme.secondary ?? '#2E2E2E'};
          --color-tertiary: ${theme.tertiary ?? '#E2E2E2'};
          --color-gray: ${theme.text ?? '#222222'};
        }
      `}</style>

      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="screen-orientation" content="portrait" />

      {/* Android */}
      <meta name="theme-color" content={theme.primary} />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Windows */}
      <meta name="msapplication-navbutton-color" content={theme.primary} />
      <meta name="msapplication-TileColor" content={theme.primary} />
      <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />

      {/* Pinned Sites */}
      <meta name="application-name" content={name} />
      <meta name="msapplication-starturl" content="/" />
    </NextHead>
  );
};
