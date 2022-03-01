import { rest, setupWorker, SetupWorkerApi } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { BACKEND_API_URL } from '../interface/backend';

import {
  domainContent,
  questionnairesContent,
  staticContent,
} from './data/backend-api';

const backendAPIMockHandlers = [
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

export const createErrorResponse = (path: string) => {
  return rest.get(BACKEND_API_URL + path, (_, res, ctx) => {
    return res(ctx.status(500), ctx.body('Error'));
  });
};

export const setupBackendAPIMockServer = ({
  forceServer,
}: {
  forceServer?: boolean;
} = {}) => {
  return forceServer || typeof window === 'undefined'
    ? setupServer(...backendAPIMockHandlers)
    : setupWorker(...backendAPIMockHandlers);
};

export const startBackendAPIMockServer = async () => {
  const server = setupBackendAPIMockServer();
  return (server as SetupServerApi).listen
    ? (server as SetupServerApi).listen()
    : (server as SetupWorkerApi).start();
};
