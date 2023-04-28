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
  questionnaire: Questionnaire;
}>;

export const queryQuestionnairePageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const id = (ctx.query.topic as string)?.split('-').slice(1).pop();
    if (!id) throw new Error('No ID given for fetching questionnaire.');

    const [content, questionnaire] = await Promise.all([
      Strapi.getLandingPage(domain),
      Strapi.getQuestionnaire(id),
    ]);

    if (!content.attributes) throw new Error('No data for domain: ' + content);
    if (!questionnaire.attributes)
      throw new Error('No data for questionnaire: ' + questionnaire);

    return {
      props: {
        content: content.attributes,
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

export type ContentPage = NextPage<{
  content: LandingPage;
  staticContent: StaticContent;
}>;

export const queryContentPageContent = async (ctx: NextPageContext) => {
  try {
    const domain = normalizeHostname(ctx.req?.headers.host);
    if (!domain) throw new Error('No host given in headers.');

    const content = await Strapi.getLandingPage(domain);
    const staticContent = await Strapi.getStaticContent({
      locale: content.attributes.language,
    });

    if (!content.attributes) throw new Error('No data for domain: ' + content);
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
