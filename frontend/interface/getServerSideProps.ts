import type { GetServerSidePropsResult, NextPageContext } from 'next';
import * as Sentry from '@sentry/nextjs';

import type { LandingPage, Questionnaire, StaticContent } from '../backend-api';
import { StrapiAPI } from './backend';
import { normalizeHostname } from '../utils/normalizeHostname';

const captureSSPException = (error: unknown) => {
  Sentry.captureException(error, {
    tags: { interface: 'GetServerSidePropsRequest' },
  });
};

/** Helper function to return a redirect object */

export const redirectTo = (
  path: string,
): GetServerSidePropsResult<Record<string, never>> => ({
  redirect: {
    destination: path,
    permanent: false,
  },
});

/** Dynamic Content Fetching */

export const requestDomainSpecificContent = async (ctx: NextPageContext) => {
  try {
    const host = normalizeHostname(ctx.req?.headers.host);
    if (!host) throw new Error('No host given in headers.');
    return await StrapiAPI.getLandingPageContentByDomain(host);
  } catch (err) {
    captureSSPException(err);
  }
};

/** Questionnaire Content Fetching */

export const requestQuestionnaireContent = async (ctx: NextPageContext) => {
  try {
    const id = (ctx.query.topic as string)?.split('-').slice(1).pop();
    if (!id) throw new Error('No ID given for fetching questionnaire.');

    return await StrapiAPI.getQuestionnaireContentById(id);
  } catch (err) {
    captureSSPException(err);
  }
};

/** Static Content Fetching */

export const requestStaticContent = async () => {
  try {
    return await StrapiAPI.getStaticLandingPageContent();
  } catch (err) {
    captureSSPException(err);
  }
};

/** Request for content pages like front-page, privacy-page, etc. */

export type ContentPageContent = {
  domainContent: LandingPage;
  staticContent: StaticContent;
};

export const collectContentPageContent = async (ctx: NextPageContext) => {
  try {
    const domainContent = await requestDomainSpecificContent(ctx);
    const staticContent = await requestStaticContent();
    if (!domainContent || !staticContent) throw new Error();
    return { props: { domainContent, staticContent } };
  } catch (err) {
    return redirectTo('/404');
  }
};

/** Request for questionnaire pages. */

export type QuestionnairePageContent = {
  domainContent: LandingPage;
  questionnaireContent: Questionnaire;
};

export const collectQuestionnairePageContent = async (ctx: NextPageContext) => {
  try {
    const domainContent = await requestDomainSpecificContent(ctx);
    const questionnaireContent = await requestQuestionnaireContent(ctx);
    if (!domainContent || !questionnaireContent) throw new Error();
    return { props: { domainContent, questionnaireContent } };
  } catch (err) {
    return redirectTo('/404');
  }
};
