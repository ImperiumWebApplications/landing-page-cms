import type { GetServerSidePropsResult, NextPageContext } from 'next';
import type { LandingPage, StaticContent } from '../backend-api';
import {
  getLandingPageContentByDomain,
  getStaticLandingPageContent,
} from './backend';

export interface DomainSpecificContent {
  domainContent: LandingPage;
  staticContent: StaticContent;
}

export const requestDomainSpecificContent = async (ctx: NextPageContext) => {
  const host = ctx.req?.headers.host;

  if (!host) return redirectToNotFoundPage();

  try {
    const domainContent = await getLandingPageContentByDomain(host);
    const staticContent = await getStaticLandingPageContent();

    if (!domainContent || !staticContent) return redirectToNotFoundPage();

    return { props: { domainContent, staticContent } };
  } catch (err) {
    return redirectToNotFoundPage();
  }
};

const redirectToNotFoundPage = (): GetServerSidePropsResult<{}> => ({
  redirect: {
    destination: '/404',
    permanent: false,
  },
});
