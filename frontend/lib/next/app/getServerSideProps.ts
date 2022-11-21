import type { GetServerSidePropsResult, NextPageContext } from 'next';
import * as Sentry from '@sentry/nextjs';

import { normalizeHostname } from '../../../utils/normalizeHostname';
import { Strapi } from '../../strapi';

export const serverRedirect = (
  path: string,
): GetServerSidePropsResult<Record<string, never>> => ({
  redirect: {
    destination: path,
    permanent: false,
  },
});

export const queryLandingPageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const data = await Strapi.getLandingPage(domain);
    if (!data.attributes) throw new Error('No data for domain: ' + data);

    return { props: { content: data.attributes } };
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return serverRedirect('/404');
  }
};

export const queryQuestionnairePageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const id = (ctx.query.topic as string)?.split('-').slice(1).pop();
    if (!id) throw new Error('No ID given for fetching questionnaire.');

    const data = await Strapi.getLandingPage(domain);
    if (!data.attributes) throw new Error('No data for domain: ' + data);

    const questionnaire = await Strapi.getQuestionnaire(id);
    if (!questionnaire.attributes)
      throw new Error('No data for questionnaire: ' + questionnaire);

    return {
      props: {
        content: data.attributes,
        questionnaire: questionnaire.attributes,
      },
    };
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return serverRedirect('/404');
  }
};

export const queryStaticPageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const data = await Strapi.getLandingPage(domain);
    if (!data.attributes) throw new Error('No data for domain: ' + data);

    const staticContent = await Strapi.getStaticContent();
    if (!staticContent.attributes) throw new Error('No static content found');

    return {
      props: { content: { ...data.attributes, ...staticContent.attributes } },
    };
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return serverRedirect('/404');
  }
};
