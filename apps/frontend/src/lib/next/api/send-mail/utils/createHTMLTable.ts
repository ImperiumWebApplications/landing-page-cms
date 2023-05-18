import { formatAppointmentsDate } from './formatAppointmentsDate';

export const replaceWhitespaceInHTML = (str: string) =>
  str.replace(
    /(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g,
    '$1$3',
  );

export const createHTMLTable = (
  data: (
    | { question: string; answer: string }
    | { date: string; location: string; duration: number }
  )[],
) => {
  const isAppointmentsData = data?.[0]?.hasOwnProperty('date');

  const heading = isAppointmentsData
    ? 'Mögliche Termine:'
    : 'Antworten aus dem Fragebogen:';

  const header = `<p style="margin-bottom:10px;">${heading}</p><table>`;
  const footer = `</table>`;
  const placeholder =
    '<tr style="border:none"><td style="font-weight:bold;padding:10px">Keine Angaben gemacht.</td></tr>';

  if (!data.length)
    return replaceWhitespaceInHTML(`${header}${placeholder}${footer}`);

  const content = data.map((item) => {
    const isQuestionAnswer = 'question' in item && 'answer' in item;

    if (isQuestionAnswer) {
      return `
      <tr style="border:none">
        <td style="font-weight:bold;padding:10px">
          ${item.question}
        </td>
        <td style="padding:10px">
          ${item.answer}
        </td>
      </tr>`;
    } else {
      return `
      <tr style="border:none">
        <td style="font-weight:bold;padding:10px">
          ${formatAppointmentsDate({
            date: item.date,
            duration: item.duration,
          })}
        </td>
        <td style="padding:10px">
          ${item.location}
        </td>
      </tr>`;
    }
  });

  return replaceWhitespaceInHTML(`${header}${content.join('')}${footer}`);
};
