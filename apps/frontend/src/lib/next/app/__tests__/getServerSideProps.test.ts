import { NextPageContext } from 'next';
import { SetupServerApi } from 'msw/node';
import {
  createErrorResponse,
  setupMockServer,
} from '../../../../../mocks/utils/mock-rest-api';
import { StrapiMockHandlers } from '../../../../../mocks/lib/strapi/api';
import {
  queryContentPageContent,
  queryQuestionnairePageContent,
} from '../getServerSideProps';
import {
  content,
  questionnaire,
  staticContent,
} from '../../../../../mocks/lib/strapi/data';
import { Strapi } from '../../../strapi';

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

const server = setupMockServer(StrapiMockHandlers, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('queryContentPageContent', () => {
  it('should return domain content', async () => {
    const ctx = configureCtx({ host: 'test' });
    const result = await queryContentPageContent(ctx);
    expect(result).toEqual({
      props: {
        content: content.data[0].attributes,
        staticContent: staticContent.data.attributes,
      },
    });
  });

  it('should return redirect if no host is specified', async () => {
    const ctx = configureCtx({ host: undefined });
    const result = await queryContentPageContent(ctx);
    expect(result).toEqual({
      redirect: { destination: '/404', permanent: false },
    });
  });

  it('should return redirect if content is undefined', async () => {
    server.use(
      createErrorResponse(Strapi.instance.options.url + '/landing-pages'),
    );
    const ctx = configureCtx({ host: 'test' });
    const result = await queryContentPageContent(ctx);
    expect(result).toEqual({
      redirect: { destination: '/404', permanent: false },
    });
  });
});

describe('queryQuestionnairePageContent', () => {
  it('should return questionnaire content', async () => {
    const ctx = configureCtx({ host: 'test', topic: 'fliesen-1' });
    const result = await queryQuestionnairePageContent(ctx);
    expect(result).toEqual({
      props: {
        content: content.data[0].attributes,
        questionnaire: questionnaire.data[0].attributes,
      },
    });
  });
  it('should return redirect if incorrect questionnaire ID is provided', async () => {
    const ctx = configureCtx({ topic: 'fliesen1' });
    const result = await queryQuestionnairePageContent(ctx);
    expect(result).toEqual({
      redirect: { destination: '/404', permanent: false },
    });
  });
  it('should return redirect if content is undefined', async () => {
    server.use(
      createErrorResponse(Strapi.instance.options.url + '/questionnaires'),
    );
    const ctx = configureCtx({ topic: 'fliesen-1' });
    const result = await queryQuestionnairePageContent(ctx);
    expect(result).toEqual({
      redirect: { destination: '/404', permanent: false },
    });
  });
});
