import { NextApiRequest } from 'next';
import { contactDataMock } from '../../../mocks/questionnaire/data';

import { retrieveDataFromRequestBody } from '../create-lead';

jest.mock('@sentry/nextjs');

const DEFAULT_REQ = {
  method: 'POST',
  query: { API_ROUTE: 'test_public_api_route' },
  body: {
    host: 'test.com',
    contact: contactDataMock,
    questionnaire: [
      {
        question: { id: 1, value: 'Question' },
        answer: { id: 1, value: 'Answer ' },
      },
    ],
  },
} as unknown as NextApiRequest;

describe('pages/api/create-lead/retrieveDataFromRequestBody', () => {
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
    }).toThrow('Missing or invalid public API route query param.');
  });

  it('should throw error for missing hostname', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          host: '',
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid form data.');
  });

  it('should throw error for missing contact data', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          contact: '',
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid form data.');
  });

  it('should throw error for missing questionnaire data', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          questionnaire: '',
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid form data.');
  });

  it('should return all data from the request body', () => {
    expect(
      retrieveDataFromRequestBody({ ...DEFAULT_REQ } as NextApiRequest),
    ).toEqual({
      contact: contactDataMock,
      host: 'test.com',
      questionnaire: [
        {
          answer: { id: 1, value: 'Answer ' },
          question: { id: 1, value: 'Question' },
        },
      ],
    });
  });
});
