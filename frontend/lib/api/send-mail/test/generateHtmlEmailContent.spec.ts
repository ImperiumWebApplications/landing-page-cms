import * as fs from 'fs';
import { resolve } from 'path';

import { EmailTemplate } from '../../../../config/emails.config';
import { domainContent } from '../../../../mocks/data/backend-api';
import { generateHtmlEmailContent } from '../utils/generateHtmlEmailContent';

jest.mock('fs');
const mockedFs = jest.mocked(fs);

const hbsTemplateMock = jest.fn();
jest.mock('handlebars', () => ({ compile: () => hbsTemplateMock }));

const mjmlMock = jest.fn();
jest.mock('mjml', () => () => mjmlMock());

const defaultData = {
  template: 'Confirmation' as keyof typeof EmailTemplate,
  recipient: {
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'test@test.com',
    phone: '1234567890',
    postalCode: '22303',
  },
  landingPage: domainContent.data[0].attributes,
  content: {
    questionnaire: [
      {
        answer: { id: 1, value: 'Answer 1' },
        question: { id: 1, value: 'Question 1' },
      },
    ],
  },
};

describe('generateHtmlEmailContent', () => {
  beforeEach(() => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('test string');
    mjmlMock.mockReturnValue({ html: 'mjmlHtmlString', errors: [] });
    hbsTemplateMock.mockReturnValue('hbsTemplateString');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should use correct template file path', () => {
    generateHtmlEmailContent({ ...defaultData });
    expect(mockedFs.existsSync).toHaveBeenCalledWith(
      expect.stringContaining(resolve(process.cwd(), 'email')),
    );
  });

  it('should throw error if file not exists', () => {
    mockedFs.existsSync.mockReturnValue(false);
    const result = () => generateHtmlEmailContent({ ...defaultData });
    expect(result).toThrow('Missing template for sending mail.');
  });

  it('should call handlebars template function with correct context', () => {
    generateHtmlEmailContent({ ...defaultData });
    expect(hbsTemplateMock).toHaveBeenCalledWith({
      colorPrimary: '#359b88',
      colorText: '#737373',
      firstName: 'FirstName',
      lastName: 'LastName',
      logoUrl:
        'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/logo_485181aa26.png',
      phone: '1234567890',
      postalCode: '22303',
      questionnaire: [
        {
          answer: { id: 1, value: 'Answer 1' },
          question: { id: 1, value: 'Question 1' },
        },
      ],
    });
  });

  it('should throw error if compiled template does not exist', () => {
    hbsTemplateMock.mockReturnValue(undefined);
    const result = () => generateHtmlEmailContent({ ...defaultData });
    expect(result).toThrow('Error while generating mail template.');
  });

  it('should throw error if mjml compiling threw errors', () => {
    mjmlMock.mockReturnValue({ html: undefined, errors: ['error'] });
    const result = () => generateHtmlEmailContent({ ...defaultData });
    expect(result).toThrow('Error while generating mail template.');
  });
});
