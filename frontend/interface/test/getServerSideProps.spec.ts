import { NextPageContext } from 'next';
import {
  collectContentPageContent,
  collectQuestionnairePageContent,
  redirectTo,
  requestDomainSpecificContent,
  requestQuestionnaireContent,
  requestStaticContent,
} from '../getServerSideProps';
import {
  createErrorResponse,
  setupBackendAPIMockServer,
} from '../../mocks/backend-api';
import { SetupServerApi } from 'msw/lib/types/node';
import {
  domainContent,
  questionnairesContent,
  staticContent,
} from '../../mocks/data/backend-api';

jest.mock('@sentry/nextjs');

const configureCtx = ({
  host,
  topic,
}: { host?: string; topic?: string } = {}) => {
  return {
    req: { headers: { host } },
    query: { topic },
  } as unknown as NextPageContext;
};

const server = setupBackendAPIMockServer({
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('requestDomainSpecificContent handler', () => {
  it('should return domain content', async () => {
    const ctx = configureCtx({ host: 'test' });
    const result = await requestDomainSpecificContent(ctx);
    expect(result).toEqual(domainContent.data[0].attributes);
  });

  it('should return undefined if no host is specified', async () => {
    const ctx = configureCtx({ host: undefined });
    const result = await requestDomainSpecificContent(ctx);
    expect(result).toEqual(undefined);
  });

  it('should return undefined if content is undefined', async () => {
    server.use(createErrorResponse('/landing-pages'));
    const ctx = configureCtx({ host: 'test' });
    const result = await requestDomainSpecificContent(ctx);
    expect(result).toEqual(undefined);
  });
});

describe('requestQuestionnaireContent handler', () => {
  it('should return questionnaire content', async () => {
    const ctx = configureCtx({ topic: 'fliesen-1' });
    const result = await requestQuestionnaireContent(ctx);
    expect(result).toEqual(questionnairesContent.data[0].attributes);
  });
  it('should return undefined if incorrect questionnaire ID is provided', async () => {
    const ctx = configureCtx({ topic: 'fliesen1' });
    const result = await requestQuestionnaireContent(ctx);
    expect(result).toEqual(undefined);
  });
  it('should return undefined if content is undefined', async () => {
    server.use(createErrorResponse('/questionnaires'));
    const ctx = configureCtx({ topic: 'fliesen-1' });
    const result = await requestQuestionnaireContent(ctx);
    expect(result).toEqual(undefined);
  });
});

describe('requestStaticContent handler', () => {
  it('should return static content', async () => {
    const result = await requestStaticContent();
    expect(result).toEqual(staticContent.data.attributes);
  });
  it('should return undefined if content is undefined', async () => {
    server.use(createErrorResponse('/static-content'));
    const result = await requestStaticContent();
    expect(result).toEqual(undefined);
  });
});

describe('collectContentPageContent handler', () => {
  it('should return domain and static content', async () => {
    const ctx = configureCtx({ host: 'localhost' });
    const result = await collectContentPageContent(ctx);
    expect(result).toEqual({
      props: {
        domainContent: domainContent.data[0].attributes,
        staticContent: staticContent.data.attributes,
      },
    });
  });
  it('should redirect on error', async () => {
    server.use(createErrorResponse('/static-content'));
    const ctx = configureCtx({ host: 'localhost' });
    const result = await collectContentPageContent(ctx);
    expect(result).toEqual(redirectTo('/404'));
  });
});

describe('collectQuestionnairePageContent handler', () => {
  it('should return domain and questionnaire content', async () => {
    const ctx = configureCtx({ host: 'localhost', topic: 'fliesen-1' });
    const result = await collectQuestionnairePageContent(ctx);
    expect(result).toEqual({
      props: {
        domainContent: domainContent.data[0].attributes,
        questionnaireContent: questionnairesContent.data[0].attributes,
      },
    });
  });
  it('should redirect on error', async () => {
    server.use(createErrorResponse('/questionnaires'));
    const ctx = configureCtx({ host: 'localhost', topic: 'fliesen-1' });
    const result = await collectQuestionnairePageContent(ctx);
    expect(result).toEqual(redirectTo('/404'));
  });
});
