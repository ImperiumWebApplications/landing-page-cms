import type { ContactDetailsFormValues } from './ContactDetailsForm';
import { ContactFieldConfig } from './ContactDetailsForm.config';

export const isValidContactDetailsData = (
  contact?: ContactDetailsFormValues,
) => {
  if (!contact) return false;
  if (!contact.salutation) return false;
  if (!contact.acceptedTerms) return false;

  const { FirstName, LastName, Phone, Email } = ContactFieldConfig;

  if (
    FirstName.getConfig('English').validators.some(({ regex }) => {
      const isValid = regex.test(contact.firstName ?? '');
      return !isValid;
    })
  )
    return false;

  if (
    LastName.getConfig('English').validators.some(({ regex }) => {
      const isValid = regex.test(contact.lastName ?? '');
      return !isValid;
    })
  )
    return false;

  if (
    Phone.getConfig('English').validators.some(({ regex }) => {
      const isValid = regex.test(contact.phone ?? '');
      return !isValid;
    })
  )
    return false;

  if (
    Email.getConfig('English').validators.some(({ regex }) => {
      const isValid = regex.test(contact.email ?? '');
      return !isValid;
    })
  )
    return false;

  return true;
};
