import * as fs from 'fs';
import { resolve } from 'path';
import { EmailTemplate } from '../../../../../../email';

import { content } from '../../../../../../mocks/lib/strapi/data';
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
  landingPage: content.data[0].attributes,
  content: {
    questionnaire: [
      {
        answer: 'Answer 1',
        question: 'Question 1',
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateHtmlEmailContent({ ...defaultData } as any);
    expect(mockedFs.existsSync).toHaveBeenCalledWith(
      expect.stringContaining(resolve(process.cwd(), 'email', 'templates')),
    );
  });

  it('should throw error if file not exists', () => {
    mockedFs.existsSync.mockReturnValue(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = () => generateHtmlEmailContent({ ...defaultData } as any);
    expect(result).toThrow('Missing template for sending mail.');
  });

  it('should call handlebars template function with correct context', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateHtmlEmailContent({ ...defaultData } as any);
    expect(hbsTemplateMock).toHaveBeenCalledWith({
      colorPrimary: '#673A99',
      colorText: '#505050',
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'test@test.com',
      logoUrl: undefined,
      phone: '1234567890',
      postalCode: '22303',
      questionnaire: [
        {
          answer: 'Answer 1',
          question: 'Question 1',
        },
      ],
    });
  });

  it('should throw error if compiled template does not exist', () => {
    hbsTemplateMock.mockReturnValue(undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = () => generateHtmlEmailContent({ ...defaultData } as any);
    expect(result).toThrow('Error while generating mail template.');
  });

  it('should throw error if mjml compiling threw errors', () => {
    mjmlMock.mockReturnValue({ html: undefined, errors: ['error'] });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = () => generateHtmlEmailContent({ ...defaultData } as any);
    expect(result).toThrow('Error while generating mail template.');
  });
});
