import type { ContactData } from '../../../../context/Questionnaire/state';
import { getCountryByDomain } from '../../../../utils/getCountryByDomain';
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
  contactData: ContactData;
}) => {
  if (contactData.city.value)
    return `${contactData.postalCode.value} (${contactData.city.value})`;

  const country = getCountryByDomain(host);
  if (!country) return `${contactData.postalCode.value}`;

  const details = getPostalCodeDetails(contactData.postalCode.value, [country]);
  if (!details.length) return `${contactData.postalCode.value}`;

  return `${contactData.postalCode.value} (${details?.[0].place})`;
};
