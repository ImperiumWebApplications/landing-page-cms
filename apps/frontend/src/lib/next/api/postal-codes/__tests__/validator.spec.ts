import { NextApiRequest } from 'next';
import { validateRequestBody } from '../validator';

jest.mock('@sentry/nextjs');

console.log(
  'Value of process.env.NEXT_PUBLIC_API_ROUTE  is',
  process.env.NEXT_PUBLIC_API_ROUTE,
);
const DEFAULT_REQ = {
  method: 'POST',
  query: { API_ROUTE: process.env.NEXT_PUBLIC_API_ROUTE },
  body: {
    code: '22303',
    countries: ['DE'],
  },
} as unknown as NextApiRequest;

describe('lib/next/api/postal-codes/validator', () => {
  it('should throw error for unsupported HTTP method', () => {
    const clonedReq = JSON.parse(JSON.stringify(DEFAULT_REQ));
    clonedReq.method = 'GET';

    expect(() => {
      validateRequestBody(clonedReq as NextApiRequest);
    }).toThrow('Unsupported HTTP method.');
  });

  it('should throw error for missing query param', () => {
    const clonedReq = JSON.parse(JSON.stringify(DEFAULT_REQ));
    clonedReq.query = {};

    expect(() => {
      validateRequestBody(clonedReq as NextApiRequest);
    }).toThrow('Missing or invalid public API route query param.');
  });

  it('should throw error for invalid list of countries', () => {
    expect(() => {
      validateRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          countries: undefined,
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid list of countries provided.');

    expect(() => {
      validateRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          countries: ['CC'],
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid list of countries provided.');

    expect(() => {
      validateRequestBody({
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
      validateRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          code: undefined,
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid postal code query param.');

    expect(() => {
      validateRequestBody({
        ...DEFAULT_REQ,
        body: {
          ...DEFAULT_REQ.body,
          code: '2222',
        },
      } as NextApiRequest);
    }).toThrow('Missing or invalid postal code query param.');
  });

  it('should return countries and postal code from request', () => {
    expect(validateRequestBody(DEFAULT_REQ)).toEqual({
      countries: ['DE'],
      code: '22303',
    });

    expect(
      validateRequestBody({
        ...DEFAULT_REQ,
        body: {
          countries: ['DE', 'CH'],
          code: 6300,
        },
      } as NextApiRequest),
    ).toEqual({
      countries: ['DE', 'CH'],
      code: '6300',
    });
  });
});
