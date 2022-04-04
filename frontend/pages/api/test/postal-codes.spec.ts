import { NextApiRequest } from 'next';
import { retrieveDataFromRequestBody } from '../postal-codes';

jest.mock('@sentry/nextjs');

const DEFAULT_REQ = {
  method: 'POST',
  query: { API_ROUTE: 'test_public_api_route' },
  body: {
    code: '22303',
    countries: ['DE'],
  },
} as unknown as NextApiRequest;

describe('pages/api/postal-codes/retrieveDataFromRequestBody', () => {
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

  it('should throw error for invalid list of countries', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          countries: undefined,
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid list of countries provided.');

    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          countries: ['CC'],
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid list of countries provided.');

    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          countries: ['DE', 'CC'],
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid list of countries provided.');
  });

  it('should throw error for invalid postal code', () => {
    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          code: undefined,
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid postal code query param.');

    expect(() => {
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          code: '2222',
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid postal code query param.');
  });

  it('should return countries and postal code from request', () => {
    expect(retrieveDataFromRequestBody(DEFAULT_REQ)).toEqual({
      countries: ['DE'],
      postalCode: '22303',
    });

    expect(
      retrieveDataFromRequestBody({
        ...DEFAULT_REQ,
        body: {
          countries: ['DE', 'CH'],
          code: 6300,
        },
      } as NextApiRequest),
    ).toEqual({
      countries: ['DE', 'CH'],
      postalCode: '6300',
    });
  });
});
