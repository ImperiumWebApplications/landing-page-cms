import type { GetServerSidePropsResult, NextPageContext } from 'next';

import type { LandingPage, Questionnaire, StaticContent } from '../backend-api';
import {
  getLandingPageContentByDomain,
  getQuestionnaireContentById,
  getStaticLandingPageContent,
} from './backend';

/** Helper function to return a redirect object */

const redirectToNotFoundPage = (): GetServerSidePropsResult<
  Record<string, never>
> => ({
  redirect: {
    destination: '/404',
    permanent: false,
  },
});

/** Dynamic Content Fetching */

const requestDomainSpecificContent = async (ctx: NextPageContext) => {
  const host = ctx.req?.headers.host;
  if (!host) return redirectToNotFoundPage();

  try {
    const domainContent = await getLandingPageContentByDomain(host);
    return domainContent ?? redirectToNotFoundPage();
  } catch (err) {
    return redirectToNotFoundPage();
  }
};

/** Questionnaire Content Fetching */

const requestQuestionnaireContent = async (ctx: NextPageContext) => {
  const id = (ctx.query.topic as string)?.split('-').pop();
  if (!id) return null;

  try {
    const questionnaireContent = await getQuestionnaireContentById(id);
    return questionnaireContent ?? null;
  } catch (err) {
    return null;
  }
};

/** Static Content Fetching */

const requestStaticContent = async () => {
  try {
    const staticContent = await getStaticLandingPageContent();
    return staticContent ?? null;
  } catch (err) {
    return null;
  }
};

/** Request for content pages like front-page, privacy-page, etc. */

export type ContentPageContent = {
  domainContent: LandingPage;
  staticContent: StaticContent;
};

export const collectContentPageContent = async (ctx: NextPageContext) => {
  const domainContent = await requestDomainSpecificContent(ctx);
  const staticContent = await requestStaticContent();
  return { props: { domainContent, staticContent } };
};

/** Request for questionnaire pages. */

export type QuestionnairePageContent = {
  domainContent: LandingPage;
  questionnaireContent: Questionnaire;
};

export const collectQuestionnairePageContent = async (ctx: NextPageContext) => {
  const domainContent = await requestDomainSpecificContent(ctx);
  const questionnaireContent = await requestQuestionnaireContent(ctx);
  return { props: { domainContent, questionnaireContent } };
};
