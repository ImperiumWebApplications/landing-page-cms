import { ErrorType } from '../../../lib/api/error';
import {
  CreateLeadApiRequest,
  retrieveDataFromRequestBody,
} from '../create-lead';

const domain = 'test.domain.ch';
const contact = {
  acceptedTerms: {
    label:
      'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
    type: 'checkbox',
    value: true,
  },
  email: {
    label: 'E-Mail Adresse',
    type: 'email',
    value: 'info@kmuenster.com',
  },
  firstName: {
    label: 'Vorname',
    type: 'text',
    value: 'Konstantin',
  },
  lastName: {
    label: 'Nachname',
    type: 'text',
    value: 'Münster',
  },
  phone: {
    label: 'Telefonnummer',
    type: 'text',
    value: '+4915128888107',
  },
  postalCode: {
    label: 'Postleitzahl',
    type: 'text',
    value: '22222',
  },
  salutation: {
    options: [],
    type: 'radio',
    value: 'Herr',
  },
};
const questionnaire = [
  {
    answer: {
      id: 13,
      value: 'Badezimmer',
    },
    question: {
      id: 4,
      value: 'Was möchten Sie fliesen?',
    },
  },
  {
    answer: {
      id: 17,
      value: 'Ja',
    },
    question: {
      id: 5,
      value: 'Ist das Objekt im Neubauzustand?',
    },
  },
];

jest.mock('@sentry/nextjs');

describe('NextAPI - /create-lead', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_API_ROUTE = 'fakeToken';
  });

  it('should retrieve data from request correctly', () => {
    const req = {
      method: 'POST',
      query: { API_ROUTE: 'fakeToken' },
      headers: { host: domain },
      body: { contact, questionnaire },
    } as unknown as CreateLeadApiRequest;
    const result = retrieveDataFromRequestBody(req);
    expect(result).toEqual({
      data: { host: domain, contactData: contact, questionnaire },
      error: undefined,
    });
  });

  it('should throw error for non allowed methods', () => {
    const req = {
      method: 'GET',
      query: { API_ROUTE: 'fakeToken' },
      headers: { host: domain },
      body: { contact, questionnaire },
    } as unknown as CreateLeadApiRequest;
    const result = retrieveDataFromRequestBody(req);
    expect(result).toEqual({
      data: undefined,
      error: ErrorType.UNSUPPORTED_METHOD,
    });
  });

  it('should throw error for missing API Route query token', () => {
    const req = {
      method: 'POST',
      query: { API_ROUTE: '' },
      headers: { host: domain },
      body: { contact, questionnaire },
    } as unknown as CreateLeadApiRequest;
    const result = retrieveDataFromRequestBody(req);
    expect(result).toEqual({
      data: undefined,
      error: ErrorType.NOT_AUTHORIZED,
    });
  });

  it('should throw error for missing data', () => {
    const req = {
      method: 'POST',
      query: { API_ROUTE: 'fakeToken' },
      headers: { host: domain },
      body: { contact },
    } as unknown as CreateLeadApiRequest;
    const result = retrieveDataFromRequestBody(req);
    expect(result).toEqual({
      data: undefined,
      error: ErrorType.UNPROCESSABLE_ENTITY,
    });
  });

  it('should throw error for missing domain', () => {
    const req = {
      method: 'POST',
      query: { API_ROUTE: 'fakeToken' },
      headers: { host: '' },
      body: { contact, questionnaire },
    } as unknown as CreateLeadApiRequest;
    const result = retrieveDataFromRequestBody(req);
    expect(result).toEqual({
      data: undefined,
      error: ErrorType.UNPROCESSABLE_ENTITY,
    });
  });
});
