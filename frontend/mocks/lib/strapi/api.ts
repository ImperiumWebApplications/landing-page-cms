import { rest } from 'msw';
import { Strapi } from '../../../src/lib/strapi';
import { content, pipedriveApis, questionnaires, staticContent } from './data';

export const StrapiMockHandlers = [
  rest.get(Strapi.instance.options.url + '/landing-pages', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(content)),
  ),
  rest.get(Strapi.instance.options.url + '/static-content', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(staticContent)),
  ),
  rest.get(Strapi.instance.options.url + '/questionnaires', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(questionnaires)),
  ),
  rest.get(Strapi.instance.options.url + '/pipedrive-apis', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(pipedriveApis)),
  ),
];
