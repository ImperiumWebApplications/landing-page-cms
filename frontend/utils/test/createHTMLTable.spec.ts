import type { QuestionnaireItem } from '../../context/Questionnaire/state';
import { createHTMLTable } from '../createHTMLTable';

describe('createHTMLTable', () => {
  it('should return table with header and footer', () => {
    const data: QuestionnaireItem[] = [
      {
        question: { id: 1, value: 'Question 1' },
        answer: { id: 1, value: 'Answer1' },
      },
    ];
    const result = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table><tr style="border:none"><td style="font-weight:bold;padding:10px">Question 1</td><td style="padding:10px">Answer1</td></tr></table>`;
    expect(createHTMLTable(data)).toEqual(result);
  });

  it('should not remove white spaces in between tags', () => {
    const data: QuestionnaireItem[] = [
      {
        question: { id: 1, value: 'Question        1' },
        answer: { id: 1, value: 'Answer1' },
      },
    ];
    const result = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table><tr style="border:none"><td style="font-weight:bold;padding:10px">Question        1</td><td style="padding:10px">Answer1</td></tr></table>`;
    expect(createHTMLTable(data)).toEqual(result);
  });

  it('should return placeholder for now data', () => {
    const data: QuestionnaireItem[] = [];
    const result = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table><tr style="border:none"><td style="font-weight:bold;padding:10px">Keine Angaben gemacht.</td></tr></table>`;
    expect(createHTMLTable(data)).toEqual(result);
  });
});
