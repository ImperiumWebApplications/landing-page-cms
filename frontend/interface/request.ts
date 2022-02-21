import type { GetServerSidePropsResult, NextPageContext } from 'next';
import * as Sentry from '@sentry/nextjs';

import type { LandingPage, Questionnaire, StaticContent } from '../backend-api';
import { StrapiAPI } from './backend';

/** Helper function to return a redirect object */

const redirectTo = (
  path: string,
): GetServerSidePropsResult<Record<string, never>> => ({
  redirect: {
    destination: path,
    permanent: false,
  },
});

/** Dynamic Content Fetching */

const requestDomainSpecificContent = async (ctx: NextPageContext) => {
  const host = ctx.req?.headers.host;
  if (!host) throw new Error('No host given in headers.');

  try {
    const domainContent = await StrapiAPI.getLandingPageContentByDomain(host);
    return domainContent ?? Promise.reject();
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return Promise.reject(err);
  }
};

/** Questionnaire Content Fetching */

const requestQuestionnaireContent = async (ctx: NextPageContext) => {
  const id = (ctx.query.topic as string)?.split('-').pop();
  if (!id) throw new Error('No ID given for fetching questionnaire.');

  try {
    const questionnaireContent = await StrapiAPI.getQuestionnaireContentById(
      id,
    );
    return questionnaireContent ?? Promise.reject();
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return Promise.reject(err);
  }
};

/** Static Content Fetching */

const requestStaticContent = async () => {
  try {
    const staticContent = await StrapiAPI.getStaticLandingPageContent();
    return staticContent ?? Promise.reject();
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return Promise.reject(err);
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
    return { props: { domainContent, questionnaireContent } };
  } catch (err) {
    return redirectTo('/404');
  }
};
