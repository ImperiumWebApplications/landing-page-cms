import { NextSeoProps } from 'next-seo';
import { LandingPage } from '../backend-api';

export const defaultSEOProps = (content: LandingPage) => {
  return {
    title: content.seo_title,
    description: content.seo_description,
    defaultTitle: content.seo_title,
    openGraph: {
      type: 'website',
      url: `https://${content.domain}`,
      description: content.seo_description,
      title: content.seo_title,
    },
    additionalLinkTags: content.favicon?.data
      ? [
          {
            rel: 'shortcut icon',
            type: content.favicon.data.attributes.mime,
            href: content.favicon.data.attributes.url,
          },
          {
            rel: 'shortcut icon',
            sizes: '192x192',
            href: content.favicon.data.attributes.url,
          },
          {
            rel: 'apple-touch-icon',
            href: content.favicon.data.attributes.url,
          },
        ]
      : undefined,
  } as NextSeoProps;
};
