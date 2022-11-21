import type { SetupServerApi } from 'msw/node';
import { rest } from 'msw';

import { createLeadInPipedrive, CreateLeadInPipedriveProps } from '..';
import { contactDataMock } from '../../../../../mocks/questionnaire/data';
import {
  createErrorResponse,
  setupAPIMockServer,
} from '../../../../../mocks/utils/mock-rest-api';
import {
  createdLead,
  createdNote,
} from '../../../../../mocks/lib/pipedrive/data';
import { StrapiMockHandlers } from '../../../../../mocks/lib/strapi/api';
import { PipedriveMockHandlers } from '../../../../../mocks/lib/pipedrive/api';
import { Pipedrive } from '../../../../pipedrive';

jest.mock('@sentry/nextjs');

const handler = [...StrapiMockHandlers, ...PipedriveMockHandlers];
const server = setupAPIMockServer(handler, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const defaultData: CreateLeadInPipedriveProps = {
  host: 'test.com',
  contact: { ...contactDataMock },
  questionnaire: [
    {
      answer: { id: 1, value: 'Answer 1' },
      question: { id: 1, value: 'Question 1' },
    },
  ],
};

export const createUnknownPersonResponse = () => {
  return rest.get(
    Pipedrive.instance.getUri() + '/persons/search',
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.body(JSON.stringify({ success: true, data: { items: [] } })),
      );
    },
  );
};

describe('lib/next/api/create-lead', () => {
  it('should return person, lead, and note object for known person', async () => {
    expect(await createLeadInPipedrive({ ...defaultData })).toEqual({
      lead: createdLead,
      note: createdNote,
      person: {
        id: 1,
        type: 'person',
        name: 'test test',
        phones: ['+4915128888107'],
        emails: ['info@kmuenster.com'],
        visible_to: 3,
        owner: {
          id: 12886774,
        },
        organization: null,
        custom_fields: ['22222'],
        notes: [],
      },
    });
  });

  it('should return person, lead, and note object for unknown person', async () => {
    server.use(createUnknownPersonResponse());
    expect(
      await createLeadInPipedrive({
        ...defaultData,
        contact: {
          ...defaultData.contact,
          postalCode: { ...defaultData.contact.postalCode, value: '22303' },
        },
      }),
    ).toEqual({
      lead: createdLead,
      note: createdNote,
      person: {
        '3fe99f5caa3feebc1ceca9ec0c6ec7ad2a779bd4': '22303 Hamburg Winterhude',
        name: 'first name last name',
        phone: [{ value: '1234567890', primary: true, label: 'Telefonnummer' }],
        email: [
          { value: 'test@test.de', primary: true, label: 'E-Mail Adresse' },
        ],
      },
    });
  });

  it('should throw error if createPerson fails', async () => {
    server.use(createUnknownPersonResponse());
    server.use(
      createErrorResponse(Pipedrive.instance.getUri() + '/personFields'),
    );
    const result = async () => await createLeadInPipedrive({ ...defaultData });
    await expect(result).rejects.toThrow('Request failed with status code 500');
  });

  it('should throw error if createLead fails', async () => {
    server.use(
      createErrorResponse(Pipedrive.instance.getUri() + '/leads', 'post'),
    );
    const result = async () => await createLeadInPipedrive({ ...defaultData });
    await expect(result).rejects.toThrow('Request failed with status code 500');
  });

  it('should throw error if createNote fails', async () => {
    server.use(
      createErrorResponse(Pipedrive.instance.getUri() + '/notes', 'post'),
    );
    const result = async () => await createLeadInPipedrive({ ...defaultData });
    await expect(result).rejects.toThrow('Request failed with status code 500');
  });
});
