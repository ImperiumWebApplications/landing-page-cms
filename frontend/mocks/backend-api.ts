import { rest, setupWorker } from 'msw';
import { setupServer } from 'msw/node';

import { domainContent, staticContent } from './data/backend-api';

const BACKEND_API = process.env.BACKEND_API ?? 'http://localhost:1337';

const backendAPIMockHandlers = [
  rest.get(BACKEND_API + '/landing-pages', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(domainContent)),
  ),
  rest.get(BACKEND_API + '/static-content', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(staticContent)),
  ),
];

export const startBackendAPIMockServer = async () => {
  if (typeof window === 'undefined') {
    setupServer(...backendAPIMockHandlers).listen();
  } else {
    await setupWorker(...backendAPIMockHandlers).start();
  }
};
