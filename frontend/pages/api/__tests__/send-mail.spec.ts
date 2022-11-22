import { NextApiRequest } from 'next';

import { retrieveDataFromRequestBody } from '../send-mail';

jest.mock('@sentry/nextjs');

const DEFAULT_REQ = {
  method: 'POST',
  query: { PRIVATE_API_ROUTE: 'test_api_route' },
  body: {
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
  },
} as unknown as NextApiRequest;

describe('pages/api/send-mail/retrieveDataFromRequestBody', () => {
  it('should throw error for unsupported HTTP method', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        method: 'GET',
      } as NextApiRequest);
    }).toThrow('Unsupported HTTP method.');
  });

  it('should throw error for missing query param', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        query: {},
      } as NextApiRequest);
    }).toThrow('Missing API route token.');
  });

  it('should throw error for unknown email template', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          template: 'Confirmationnnss',
        },
      } as NextApiRequest);
    }).toThrow('Unknown email template provided.');
  });

  it('should return data for known email template', () => {
    expect(
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
      } as NextApiRequest),
    ).toEqual({
      host: 'test.com',
      payload: {
        questionnaire: [
          {
            answer: { id: 1, value: 'Answer 1' },
            question: { id: 1, value: 'Question 1' },
          },
        ],
      },
      recipient: {
        email: 'test@test.com',
        firstName: 'FirstName',
        lastName: 'LastName',
        phone: '1234567890',
        postalCode: '22303',
      },
      template: 'Confirmation',
    });
  });
});
