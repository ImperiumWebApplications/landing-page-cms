import { RequestHandler, rest, setupWorker, SetupWorkerApi } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';

export const createErrorResponse = (
  url: string,
  method: 'get' | 'post' = 'get',
) => {
  return rest[method](url, (_, res, ctx) => {
    return res(ctx.status(500), ctx.body('Error'));
  });
};

export const createUnsuccessfulResponse = (url: string) => {
  return rest.get(url, (_, res, ctx) => {
    return res(ctx.status(200), ctx.body(JSON.stringify({ success: false })));
  });
};

export const setupMockServer = (
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

export const startMockServer = async (handlers: RequestHandler[]) => {
  const server = setupMockServer(handlers);
  return (server as SetupServerApi).listen
    ? (server as SetupServerApi).listen()
    : (server as SetupWorkerApi).start();
};
