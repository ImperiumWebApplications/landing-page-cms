import type { SetupServerApi } from 'msw/node';
import { Pipedrive } from '..';
import { PipedriveMockHandlers } from '../../../../mocks/lib/pipedrive/api';
import {
  currentUser,
  personFields,
  personsSearch,
} from '../../../../mocks/lib/pipedrive/data';
import {
  createUnsuccessfulResponse,
  setupAPIMockServer,
} from '../../../../mocks/utils/mock-rest-api';
import { PIPEDRIVE_API_URL } from '../instance';

jest.mock('@sentry/nextjs');

const server = setupAPIMockServer(PipedriveMockHandlers, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('pipedrive sdk', () => {
  it('should return the current user', async () => {
    const result = await Pipedrive.getCurrentUser('xx');
    expect(result).toEqual(currentUser.data);
  });

  it('should return an error if Pipedrive response is not OK', async () => {
    server.use(createUnsuccessfulResponse(PIPEDRIVE_API_URL + '/users/me'));
    const result = async () => await Pipedrive.getCurrentUser('ds');
    await expect(result).rejects.toThrow();
  });

  it('should return existing postal code field', async () => {
    const fieldName = 'Postleitzahl';
    const existingPostalCodeField = personFields.data.filter(
      ({ name }) => name === fieldName,
    )?.[0];
    const result = await Pipedrive.getCustomPostalCodeField('xx', {
      fieldLabel: fieldName,
    });
    expect(result).toEqual(existingPostalCodeField);
  });

  it('should create a new postal code field', async () => {
    const fieldName = 'PostleitzahlNew';
    const result = await Pipedrive.getCustomPostalCodeField('xx', {
      fieldLabel: fieldName,
    });
    expect(result).toEqual({ name: 'PostleitzahlNew', field_type: 'text' });
  });

  it('should return a person object when searching by email', async () => {
    const result = await Pipedrive.getPersonByEmail('xx', 'info@kmuenster.com');
    expect(result).toEqual(personsSearch.data.items[0].item);
  });

  it('should fill the correct fields for a person', async () => {
    const result = await Pipedrive.createPersonWithCustomPostalCodeField('xx', {
      contactData: {
        salutation: 'Frau',
        firstName: 'Peter',
        lastName: 'Test',
        email: 'PeterTest@domain.de',
        phone: '0123456789',
        postalCode: '22222',
        acceptedTerms: true,
      },
    });
    expect(result).toEqual({
      '3fe99f5caa3feebc1ceca9ec0c6ec7ad2a779bd4': '22222',
      name: 'Peter Test',
      phone: [{ value: '0123456789', primary: true, label: 'Telefon' }],
      email: [{ value: 'PeterTest@domain.de', primary: true, label: 'Email' }],
    });
  });
});
