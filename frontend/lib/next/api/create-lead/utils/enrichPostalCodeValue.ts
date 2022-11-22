import { QuestionnaireState } from '../../../../../features/Questionnaire';
import { getCountryByDomain } from '../../../../../utils/getCountryByDomain';
import { getPostalCodeDetails } from '../../postal-codes';

/**
 * Returns a formatted string that contains the postal code and the city.
 * If no city value is available, it returns the postal code alone.
 */

export const enrichPostalCodeValue = ({
  host,
  contactData,
}: {
  host: string;
  contactData: QuestionnaireState['contact'];
}) => {
  if (contactData.city) return `${contactData.postalCode} ${contactData.city}`;

  const country = getCountryByDomain(host);
  if (!country) return `${contactData.postalCode}`;

  const details = getPostalCodeDetails(contactData.postalCode ?? '', [country]);
  if (!details.length) return `${contactData.postalCode}`;

  return `${contactData.postalCode} ${details?.[0].place}`;
};
