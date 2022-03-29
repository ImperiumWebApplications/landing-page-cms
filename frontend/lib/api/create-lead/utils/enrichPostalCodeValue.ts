import type { ContactData } from '../../../../context/Questionnaire/state';

/**
 * Returns a formatted string that contains the postal code and the city.
 * If no city value is available, it returns the postal code alone.
 * @param contactData: ContactData
 * @returns string
 */

export const enrichPostalCodeValue = (contactData: ContactData) => {
  return contactData.city.value
    ? `${contactData.postalCode.value} (${contactData.city.value})`
    : contactData.postalCode.value;
};
