import { QuestionnaireItem } from '../context/Questionnaire/state';

export const createHTMLForPipedriveLeadNote = (data: QuestionnaireItem[]) => {
  const header = `<p style="margin-bottom:10px;">Antworten aus dem Fragebogen:</p><table>`;
  const footer = `</table>`;
  const content = data?.map?.((item) => {
    return `
      <tr style="border:none">
        <td style="font-weight:bold;padding:10px">
          ${item?.question?.value}
        </td>
        <td style="padding:10px">
          ${item?.answer?.value}
        </td>
      </tr>`.trim();
  });
  return `${header}${content.join('')}${footer}`;
};
