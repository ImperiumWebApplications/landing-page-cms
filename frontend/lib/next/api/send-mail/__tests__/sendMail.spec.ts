import type { SetupServerApi } from 'msw/node';

import {
  createUnsuccessfulResponse,
  setupAPIMockServer,
} from '../../../../../mocks/utils/mock-rest-api';
import { sendMail, SendMailProps } from '..';
import { StrapiMockHandlers } from '../../../../../mocks/lib/strapi/api';
import { Strapi } from '../../../../strapi';

jest.mock('@sentry/nextjs');

const sendMailMock = jest.fn().mockResolvedValue(undefined);
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock,
  })),
}));

const server = setupAPIMockServer(StrapiMockHandlers, {
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
    expect(sendMailMock).toBeCalledWith(
      expect.objectContaining({
        bcc: 'info@craftsman24.net',
        from: '"Craftsman24" <testuseremail>',
        replyTo: 'info@craftsman24.net',
        subject: 'Vielen Dank für Ihre Anfrage!',
        to: 'test@test.com',
      }),
    );
  });

  it('should call sendMail with correct params for craftsman24', async () => {
    await sendMail({ ...defaultData, domain: 'craftsman24.ch' });
    expect(sendMailMock).toBeCalledWith(
      expect.objectContaining({
        bcc: 'leads@craftsman24.ch',
        from: '"Craftsman24" <testuseremail>',
        replyTo: 'info@craftsman24.net',
        subject: 'Vielen Dank für Ihre Anfrage!',
        to: 'test@test.com',
      }),
    );
  });
});
