import type { GetServerSidePropsResult, NextPageContext } from 'next';
import type { LandingPage } from '../backend-api';
import { getLandingPageContentByDomain } from './backend';

export interface DomainSpecificContent {
  domainContent: LandingPage;
}

export const requestDomainSpecificContent = async (ctx: NextPageContext) => {
  const host = ctx.req?.headers.host;

  if (!host) return redirectToNotFoundPage();

  try {
    const domainContent = await getLandingPageContentByDomain(host);
    if (!domainContent) return redirectToNotFoundPage();
    return { props: { domainContent } };
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
