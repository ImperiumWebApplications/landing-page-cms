import type { SetupServerApi } from 'msw/lib/types/node';

import {
  createUnsuccessfulResponse,
  setupAPIMockServer,
} from '../../../../mocks/utils/mock-rest-api';
import { backendAPIMockHandlers } from '../../../../mocks/backend-api';
import { sendMail, SendMailProps } from '..';
import { BACKEND_API_URL } from '../../../../interface/backend';

jest.mock('@sentry/nextjs');

const sendMailMock = jest.fn().mockResolvedValue(undefined);
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock,
  })),
}));

const server = setupAPIMockServer(backendAPIMockHandlers, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const defaultData: SendMailProps = {
  host: 'test.com',
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
        answer: { id: 1, value: 'Answer 1' },
        question: { id: 1, value: 'Question 1' },
      },
    ],
  },
};

describe('lib/api/send-mail', () => {
  it('should throw an error if no landing page could be retrieved', async () => {
    server.use(createUnsuccessfulResponse(BACKEND_API_URL + '/landing-pages'));
    const result = async () => await sendMail({ ...defaultData });
    await expect(result).rejects.toThrow('Missing data to send valid email.');
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
    await sendMail({ ...defaultData, host: 'craftsman24.ch' });
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
