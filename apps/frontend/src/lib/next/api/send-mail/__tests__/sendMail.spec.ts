import type { SetupServerApi } from 'msw/node';

import {
  createUnsuccessfulResponse,
  setupMockServer,
} from '../../../../../../mocks/utils/mock-rest-api';
import { sendMail, SendMailProps } from '..';
import { StrapiMockHandlers } from '../../../../../../mocks/lib/strapi/api';
import { Strapi } from '../../../../strapi';

jest.mock('@sentry/nextjs');

const sendMailMock = jest.fn().mockResolvedValue(undefined);
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock,
  })),
}));

const server = setupMockServer(StrapiMockHandlers, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const defaultData: SendMailProps = {
  domain: 'test.com',
  template: 'Confirmation',
  recipient: {
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'test@test.com',
    phone: '1234567890',
    postalCode: '22303',
  },
  payload: {
    questionnaire: [
      {
        answer: 'Answer 1',
        question: 'Question 1',
      },
    ],
  },
};

describe('lib/api/send-mail', () => {
  it('should throw an error if no landing page could be retrieved', async () => {
    server.use(
      createUnsuccessfulResponse(
        Strapi.instance.options.url + '/landing-pages',
      ),
    );
    const result = async () => await sendMail({ ...defaultData });
    await expect(result).rejects.toThrow('No site found for domain: test.com');
  });

  it('should call sendMail with correct params', async () => {
    await sendMail({ ...defaultData });

    expect(sendMailMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        from: '"Leadquelle" <testuseremail>',
        replyTo: 'info@kmuenster.com',
        subject: 'Vielen Dank für Ihre Anfrage!',
        to: 'test@test.com',
      }),
    );

    expect(sendMailMock.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        from: '"Leadquelle" <testuseremail>',
        subject: 'Vielen Dank für Ihre Anfrage!',
        to: 'info@kmuenster.com',
      }),
    );
  });
});
