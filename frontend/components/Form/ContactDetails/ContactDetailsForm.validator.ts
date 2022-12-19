import type { ContactDetailsFormValues } from './ContactDetailsForm';
import { ContactFieldConfig } from './ContactDetailsForm.config';

export const isValidContactDetailsData = (
  contact?: ContactDetailsFormValues,
) => {
  if (!contact) return false;
  if (!contact.salutation) return false;
  if (!contact.acceptedTerms) return false;

  if (
    ContactFieldConfig.FirstName.validators.some(({ regex }) => {
      const isValid = regex.test(contact.firstName ?? '');
      return !isValid;
    })
  )
    return false;

  if (
    ContactFieldConfig.LastName.validators.some(({ regex }) => {
      const isValid = regex.test(contact.lastName ?? '');
      return !isValid;
    })
  )
    return false;

  if (
    ContactFieldConfig.Phone.validators.some(({ regex }) => {
      const isValid = regex.test(contact.phone ?? '');
      return !isValid;
    })
  )
    return false;

  if (
    ContactFieldConfig.Email.validators.some(({ regex }) => {
      const isValid = regex.test(contact.email ?? '');
      return !isValid;
    })
  )
    return false;

  return true;
};
