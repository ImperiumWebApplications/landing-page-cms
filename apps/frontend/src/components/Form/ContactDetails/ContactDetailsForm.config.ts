import type { LandingPageLanguage } from '../../../lib/strapi';
import { i18n } from '../../../config/i18n.config';

export const ContactFieldConfig = {
  Salutation: {
    id: 'salutation',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.Salutation.LABEL,
    }),
  },
  FirstName: {
    id: 'firstName',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.FirstName.LABEL,
      validators: [
        {
          regex: /(.|\s)*\S(.|\s)*/,
          message: i18n[l].FORM_CONTACT.FirstName.messages.MISSING_VALUE,
        },
      ],
    }),
  },
  LastName: {
    id: 'lastName',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.LastName.LABEL,
      validators: [
        {
          regex: /(.|\s)*\S(.|\s)*/,
          message: i18n[l].FORM_CONTACT.LastName.messages.MISSING_VALUE,
        },
      ],
    }),
  },
  Email: {
    id: 'email',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.Email.LABEL,
      validators: [
        {
          regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
          message: i18n[l].FORM_CONTACT.Email.messages.INVALID_VALUE,
        },
      ],
    }),
  },
  Phone: {
    id: 'phone',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.Phone.LABEL,
      validators: [
        {
          regex: /^[0-9+]{1,}[0-9-]{3,15}$/,
          message: i18n[l].FORM_CONTACT.Phone.messages.INVALID_VALUE,
        },
      ],
    }),
  },
  PostalCode: {
    id: 'postalCode',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.PostalCode.LABEL,
      validators: [
        {
          regex: /^[0-9]*$/,
          message: i18n[l].FORM_CONTACT.PostalCode.messages.INVALID_VALUE,
        },
      ],
    }),
  },
  City: {
    id: 'city',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.City.LABEL,
    }),
  },
  TermsAccepted: {
    id: 'acceptedTerms',
    getConfig: (l: LandingPageLanguage) => ({
      label: i18n[l].FORM_CONTACT.AcceptedTerms.LABEL,
    }),
  },
} as const;
