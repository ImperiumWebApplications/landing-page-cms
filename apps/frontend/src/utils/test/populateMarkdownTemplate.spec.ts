import { populateMarkdownTemplate } from '../populateMarkdownTemplate';

const defaultMarkdownTemplate =
  '# Heading1\n\nParagraph with a ${client_address} variable inside.\n\nParagraph with a \n line break and a ${client_address} and a <strong>${htmlTag}</strong> tag inside.';

const defaultData = {
  client_address: 'Hamburger Weg 23\nHamburg',
  irrelevant_field: 'To be ignored',
  another_field: { id: 2, value: 'string' },
  htmlTag: '<em>HTML</em>',
};

describe('populateMarkdownTemplate', () => {
  it('should return early if no input is given', () => {
    expect(populateMarkdownTemplate()).toBeUndefined();
    expect(populateMarkdownTemplate('templateString')).toBeUndefined();
  });

  it('should return template populated with relevant data', () => {
    expect(populateMarkdownTemplate(defaultMarkdownTemplate, defaultData)).toBe(
      '# Heading1\n\nParagraph with a Hamburger Weg 23\nHamburg variable inside.\n\nParagraph with a \n line break and a Hamburger Weg 23\nHamburg and a <strong><em>HTML</em></strong> tag inside.',
    );
  });
});
