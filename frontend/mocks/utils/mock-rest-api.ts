import { RequestHandler, rest, setupWorker, SetupWorkerApi } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';

export const createErrorResponse = (url: string) => {
  return rest.get(url, (_, res, ctx) => {
    return res(ctx.status(500), ctx.body('Error'));
  });
};

export const createUnsuccessfulResponse = (url: string) => {
  return rest.get(url, (_, res, ctx) => {
    return res(ctx.status(200), ctx.body(JSON.stringify({ success: false })));
  });
};

export const setupAPIMockServer = (
  handlers: RequestHandler[],
  {
    forceServer,
  }: {
    forceServer?: boolean;
  } = {},
) => {
  return forceServer || typeof window === 'undefined'
    ? setupServer(...handlers)
    : setupWorker(...handlers);
};

export const startAPIMockServer = async (handlers: RequestHandler[]) => {
  const server = setupAPIMockServer(handlers);
  return (server as SetupServerApi).listen
    ? (server as SetupServerApi).listen()
    : (server as SetupWorkerApi).start();
};
