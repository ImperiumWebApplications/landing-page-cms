import { createHTMLTable } from '../utils/createHTMLTable';

describe('createHTMLTable', () => {
  it('should return table with header and footer', () => {
    const data = [
      {
        question: 'Question 1',
        answer: 'Answer1',
      },
    ];
    const result = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table><tr style="border:none"><td style="font-weight:bold;padding:10px">Question 1</td><td style="padding:10px">Answer1</td></tr></table>`;
    expect(createHTMLTable(data)).toEqual(result);
  });

  it('should not remove white spaces in between tags', () => {
    const data = [
      {
        question: 'Question        1',
        answer: 'Answer1',
      },
    ];
    const result = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table><tr style="border:none"><td style="font-weight:bold;padding:10px">Question        1</td><td style="padding:10px">Answer1</td></tr></table>`;
    expect(createHTMLTable(data)).toEqual(result);
  });

  it('should return placeholder for now data', () => {
    const result = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table><tr style="border:none"><td style="font-weight:bold;padding:10px">Keine Angaben gemacht.</td></tr></table>`;
    expect(createHTMLTable([])).toEqual(result);
  });
});
