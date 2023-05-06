import type { QuestionnaireState } from '../../../../../features/Questionnaire';
import { getPostalCodeDetails } from '../../postal-codes';

/**
 * Returns a formatted string that contains the postal code and the city.
 * If no city value is available, it returns the postal code alone.
 */

export const enrichPostalCodeValue = ({
  countries,
  contactData,
}: {
  countries: string[] | undefined;
  contactData: QuestionnaireState['contact'];
}) => {
  if (contactData.city) return `${contactData.postalCode} ${contactData.city}`;

  if (!countries?.length) return `${contactData.postalCode}`;

  const code = contactData.postalCode ?? '';
  const details = getPostalCodeDetails({ code, countries });
  if (!details.length) return `${contactData.postalCode}`;

  return `${contactData.postalCode} ${details?.[0].place}`;
};
