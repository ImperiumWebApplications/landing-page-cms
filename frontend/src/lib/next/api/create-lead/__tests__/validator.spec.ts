import type { NextApiRequest } from 'next';

import { contactDataMock } from '../../../../../../mocks/questionnaire/data';
import { validateRequestBody } from '../validator';

jest.mock('@sentry/nextjs');

const DEFAULT_QUESTIONNAIRE_REQ = {
  method: 'POST',
  query: { API_ROUTE: 'test_public_api_route' },
  body: {
    domain: 'test.com',
    contact: contactDataMock,
    questionnaireResults: [
      {
        question: 'Question',
        answer: 'Answer ',
      },
    ],
  },
} as unknown as NextApiRequest;

const DEFAULT_APPOINTMENT_REQ = {
  method: 'POST',
  query: { API_ROUTE: 'test_public_api_route' },
  body: {
    domain: 'test.com',
    contact: contactDataMock,
    appointmentRequests: [
      {
        date: Date.parse('2021-01-01'),
        location: 'Location',
        duration: 30,
      },
    ],
  },
} as unknown as NextApiRequest;

describe('lib/next/api/create-lead/validator', () => {
  it('should throw error for unsupported HTTP method', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_QUESTIONNAIRE_REQ,
        method: 'GET',
      } as NextApiRequest);
    }).toThrow('Unsupported HTTP method.');
  });

  it('should throw error for missing query param', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_QUESTIONNAIRE_REQ,
        query: {},
      } as NextApiRequest);
    }).toThrow('Missing or invalid public API route query param.');
  });

  it('should throw error for missing hostname', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_QUESTIONNAIRE_REQ,
        body: {
          ...DEFAULT_QUESTIONNAIRE_REQ.body,
          domain: '',
        },
      } as NextApiRequest);
    }).toThrow('No domain provided.');
  });

  it('should throw error for missing contact data', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_QUESTIONNAIRE_REQ,
        body: {
          ...DEFAULT_QUESTIONNAIRE_REQ.body,
          contact: {},
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid form data.');
  });

  it('should throw error for missing questionnaire data', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_QUESTIONNAIRE_REQ,
        body: {
          ...DEFAULT_QUESTIONNAIRE_REQ.body,
          questionnaireResults: [],
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid form data.');
  });

  it('should return all data from the questionnaire request body', () => {
    expect(
      validateRequestBody({ ...DEFAULT_QUESTIONNAIRE_REQ } as NextApiRequest),
    ).toEqual({
      contact: contactDataMock,
      domain: 'test.com',
      questionnaireResults: [
        {
          answer: 'Answer ',
          question: 'Question',
        },
      ],
    });
  });

  it('should throw error for missing appointments data', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_APPOINTMENT_REQ,
        body: {
          ...DEFAULT_APPOINTMENT_REQ.body,
          appointmentRequests: [],
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid form data.');
  });

  it('should return all data from the appointment request body', () => {
    expect(
      validateRequestBody({ ...DEFAULT_APPOINTMENT_REQ } as NextApiRequest),
    ).toEqual({
      contact: contactDataMock,
      domain: 'test.com',
      appointmentRequests: [
        {
          date: Date.parse('2021-01-01'),
          location: 'Location',
          duration: 30,
        },
      ],
    });
  });
});
