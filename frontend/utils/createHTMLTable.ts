import { QuestionnaireItem } from '../context/Questionnaire/state';

export const replaceWhitespaceInHTML = (str: string) =>
  str.replace(
    /(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g,
    '$1$3',
  );

export const createHTMLTable = (data: QuestionnaireItem[]) => {
  const header = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table>`;
  const footer = `</table>`;
  const content = data.length
    ? data.map?.((item) => {
        return `
      <tr style="border:none">
        <td style="font-weight:bold;padding:10px">
          ${item?.question?.value}
        </td>
        <td style="padding:10px">
          ${item?.answer?.value}
        </td>
      </tr>`;
      })
    : [
        '<tr style="border:none"><td style="font-weight:bold;padding:10px">Keine Angaben gemacht.</td></tr>',
      ];
  return replaceWhitespaceInHTML(`${header}${content.join('')}${footer}`);
};
