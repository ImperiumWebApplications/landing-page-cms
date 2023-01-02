import { NextSeoProps } from 'next-seo';
import { LandingPage } from '../lib/strapi';

export const extractSeoProps = (content: LandingPage) => {
  const isSubdomainSite = content.domain?.includes('lq-pages.ch');
  const disallowGoogleIndex = content.google_allow_indexation === false;

  return {
    title: content.seo_title,
    description: content.seo_description,
    defaultTitle: content.seo_title,
    noindex: disallowGoogleIndex || isSubdomainSite ? true : false,
    nofollow: disallowGoogleIndex || isSubdomainSite ? true : false,
    openGraph: {
      type: 'website',
      url: `https://${content.domain}`,
      description: content.seo_description,
      title: content.seo_title,
    },
    additionalLinkTags: content.favicon?.data.attributes
      ? [
          {
            rel: 'shortcut icon',
            type: content.favicon?.data.attributes.mime,
            href: content.favicon?.data.attributes.url,
          },
          {
            rel: 'shortcut icon',
            sizes: '192x192',
            href: content.favicon?.data.attributes.url,
          },
          {
            rel: 'apple-touch-icon',
            href: content.favicon?.data.attributes.url,
          },
        ]
      : undefined,
  } as NextSeoProps;
};
