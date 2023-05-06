import type { GetServerSidePropsResult, NextPage, NextPageContext } from 'next';
import * as Sentry from '@sentry/nextjs';

import { normalizeHostname } from '../../../utils/normalizeHostname';
import {
  LandingPage,
  Questionnaire,
  StaticContent,
  Strapi,
} from '../../strapi';

export const serverRedirect = (
  path: string,
): GetServerSidePropsResult<Record<string, never>> => ({
  redirect: {
    destination: path,
    permanent: false,
  },
});

export type QuestionnairePage = NextPage<{
  content: LandingPage;
  staticContent: StaticContent;
  questionnaire: Questionnaire;
}>;

export const queryQuestionnairePageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const id = (ctx.query.topic as string)?.split('-').slice(1).pop();
    if (!id) throw new Error('No ID given for fetching questionnaire.');

    const content = await Strapi.getLandingPage(domain);
    if (!content.attributes) throw new Error('No data for domain: ' + content);

    const [questionnaire, staticContent] = await Promise.all([
      Strapi.getQuestionnaire(id),
      Strapi.getStaticContent(content.attributes.language),
    ]);

    if (!staticContent.attributes) throw new Error('No static content found');
    if (!questionnaire.attributes)
      throw new Error('No data for questionnaire: ' + questionnaire);

    return {
      props: {
        content: content.attributes,
        questionnaire: questionnaire.attributes,
        staticContent: staticContent.attributes,
      },
    };
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return serverRedirect('/404');
  }
};

export type ContentPage = NextPage<{
  content: LandingPage;
  staticContent: StaticContent;
}>;

export const queryContentPageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const content = await Strapi.getLandingPage(domain);
    if (!content.attributes) throw new Error('No data for domain: ' + content);

    const language = content.attributes.language;
    const staticContent = await Strapi.getStaticContent(language);
    if (!staticContent.attributes) throw new Error('No static content found');

    return {
      props: {
        content: content.attributes,
        staticContent: staticContent.attributes,
      },
    };
  } catch (err) {
    Sentry.captureException(err, {
      tags: { interface: 'GetServerSidePropsRequest' },
    });
    return serverRedirect('/404');
  }
};
