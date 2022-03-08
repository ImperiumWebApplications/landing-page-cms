import { rest } from 'msw';
import { BACKEND_API_URL } from '../interface/backend';

import {
  domainContent,
  questionnairesContent,
  staticContent,
} from './data/backend-api';

export const backendAPIMockHandlers = [
  rest.get(BACKEND_API_URL + '/landing-pages', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(domainContent)),
  ),
  rest.get(BACKEND_API_URL + '/static-content', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(staticContent)),
  ),
  rest.get(BACKEND_API_URL + '/questionnaires', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(questionnairesContent)),
  ),
];
