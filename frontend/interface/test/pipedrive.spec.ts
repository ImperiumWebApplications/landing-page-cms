import type { SetupServerApi } from 'msw/lib/types/node';
import { ContactData } from '../../context/Questionnaire/state';
import {
  currentUser,
  personFields,
  personsSearch,
} from '../../mocks/data/pipedrive';
import { pipedriveAPIMockHandlers } from '../../mocks/pipedrive';
import {
  createUnsuccessfulResponse,
  setupAPIMockServer,
} from '../../mocks/utils/mock-rest-api';
import { PipedriveAPI, PIPEDRIVE_API_URL } from '../pipedrive';

jest.mock('@sentry/nextjs');

const server = setupAPIMockServer(pipedriveAPIMockHandlers, {
  forceServer: true,
}) as SetupServerApi;

beforeAll(() => server.listen());
beforeEach(() => jest.clearAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('pipedrive sdk', () => {
  it('should return the current user', async () => {
    const result = await PipedriveAPI.getCurrentUser('xx');
    expect(result).toEqual(currentUser.data);
  });

  it('should return an error if Pipedrive response is not OK', async () => {
    server.use(createUnsuccessfulResponse(PIPEDRIVE_API_URL + '/users/me'));
    const result = async () => await PipedriveAPI.getCurrentUser('ds');
    await expect(result).rejects.toThrow();
  });

  it('should return existing postal code field', async () => {
    const fieldName = 'Postleitzahl';
    const existingPostalCodeField = personFields.data.filter(
      ({ name }) => name === fieldName,
    )?.[0];
    const result = await PipedriveAPI.getCustomPostalCodeField('xx', {
      fieldLabel: fieldName,
    });
    expect(result).toEqual(existingPostalCodeField);
  });

  it('should create a new postal code field', async () => {
    const fieldName = 'PostleitzahlNew';
    const result = await PipedriveAPI.getCustomPostalCodeField('xx', {
      fieldLabel: fieldName,
    });
    expect(result).toEqual({ name: 'PostleitzahlNew', field_type: 'text' });
  });

  it('should return a person object when searching by email', async () => {
    const result = await PipedriveAPI.getPersonByEmail(
      'xx',
      'info@kmuenster.com',
    );
    expect(result).toEqual(personsSearch.data.items[0].item);
  });

  it('should fill the correct fields for a person', async () => {
    const personsData = {
      salutation: { type: 'radio', value: 'Herr', options: ['Herr', 'Frau'] },
      firstName: { type: 'text', label: 'Vorname', value: 'Peter' },
      lastName: { type: 'text', label: 'Nachname', value: 'Test' },
      email: { type: 'email', label: 'Email', value: 'PeterTest@domain.de' },
      phone: { type: 'text', label: 'Telefon', value: '0123456789' },
      postalCode: { type: 'text', label: 'Postleitzahl', value: '22222' },
      acceptedTerms: { type: 'checkbox', label: 'AGBs', value: true },
    };
    const result = await PipedriveAPI.createPersonWithCustomPostalCodeField(
      'xx',
      { contactData: personsData as ContactData },
    );
    expect(result).toEqual({
      '3fe99f5caa3feebc1ceca9ec0c6ec7ad2a779bd4': '22222',
      name: 'Peter Test',
      phone: [{ value: '0123456789', primary: true, label: 'Telefon' }],
      email: [{ value: 'PeterTest@domain.de', primary: true, label: 'Email' }],
    });
  });
});
