import { rest } from 'msw';
import { SetupServerApi } from 'msw/lib/node';

import { StrapiMockHandlers } from '../../../../../../mocks/lib/strapi/api';
import { contactDataMock } from '../../../../../../mocks/questionnaire/data';
import { setupMockServer } from '../../../../../../mocks/utils/mock-rest-api';
import { Strapi } from '../../../../strapi';

import { createLeadInCMS, CreateLeadProps } from '../create-lead';

jest.mock('@sentry/nextjs');

const handler = [...StrapiMockHandlers];
const server = setupMockServer(handler, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export const createUnknownLandingPageResponse = () => {
  return rest.get(
    Strapi.instance.options.url + '/landing-pages',
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.body(JSON.stringify({ success: true, data: [] })),
      );
    },
  );
};

export const createSuccessfulLeadResponse = () => {
  return rest.post(
    Strapi.instance.options.url + '/leads',
    async (req, res, ctx) => {
      const body = await req.json();
      return res(ctx.status(200), ctx.body(JSON.stringify({ ...body })));
    },
  );
};

const defaultData: CreateLeadProps = {
  domain: 'test.com',
  contact: { ...contactDataMock },
  questionnaireResults: [
    {
      answer: 'Answer 1',
      question: 'Question 1',
    },
  ],
};

describe('lib/next/api/create-lead/cms', () => {
  it('should return created lead on success', async () => {
    server.use(createSuccessfulLeadResponse());
    const result = await createLeadInCMS({ ...defaultData });
    expect(result).toEqual({
      lead: {
        city: 'Hamburg Winterhude',
        email: 'test@test.de',
        first_name: 'first name',
        landing_page: 4,
        last_name: 'last name',
        phone: '1234567890',
        postal_code: '22303',
        questionnaire_results: [
          {
            answer: 'Answer 1',
            question: 'Question 1',
          },
        ],
        salutation: 'Frau',
      },
    });
  });

  it('should throw error if no associated landing page was found', async () => {
    server.use(createUnknownLandingPageResponse());
    const result = async () => await createLeadInCMS({ ...defaultData });
    await expect(result).rejects.toThrow('No site found for domain: test.com');
  });
});
