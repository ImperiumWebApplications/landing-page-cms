import type { LandingPageLanguage } from '../lib/strapi';

type I18NFields = {
  BACK: string;
  BACK_HOME: string;
  HOME: string;
  NEW_REQUEST: string;
  NEXT: string;
  NOT_FOUND: string;
  NOT_FOUND_ACTION: string;
  readonly FORM_CONFIRMATION_TRACKING_PARAM: string;
  FORM_INVALID_FIELDS: string;
  FORM_SUBMIT_CTA: string;
  FORM_SUBMIT_ERROR: string;
  SHOW_MORE: string;
  SHOW_LESS: string;
  VAT_ID_GENERIC: string;
  VAT_ID_SWITZERLAND: string;
  VAT_ID_GERMANY: string;
  STATE_AUTOCOMPLETE_INPUT_PLACEHOLDER: string;
  STATE_AUTOCOMPLETE_TITLE: string;
};

type I18NFormFields = {
  FORM_CONTACT: {
    Salutation: {
      LABEL: [string, string];
    };
    FirstName: {
      LABEL: string;
      messages: {
        MISSING_VALUE: string;
      };
    };
    LastName: {
      LABEL: string;
      messages: {
        MISSING_VALUE: string;
      };
    };
    Email: {
      LABEL: string;
      messages: {
        INVALID_VALUE: string;
      };
    };
    Phone: {
      LABEL: string;
      messages: {
        INVALID_VALUE: string;
      };
    };
    PostalCode: {
      LABEL: string;
      messages: {
        INVALID_VALUE: string;
      };
    };
    City: {
      LABEL: string;
    };
    AcceptedTerms: {
      LABEL: string;
    };
  };
};

type I18NConfig = Record<LandingPageLanguage, I18NFields & I18NFormFields>;

export const i18n: I18NConfig = {
  German: {
    BACK: 'Zurück',
    BACK_HOME: 'Zurück zur Startseite',
    HOME: 'Startseite',
    NEW_REQUEST: 'Neue Anfrage',
    NEXT: 'Weiter',
    STATE_AUTOCOMPLETE_TITLE: 'Bitte teilen Sie uns unten Ihre Stadt mit:',
    STATE_AUTOCOMPLETE_INPUT_PLACEHOLDER: 'Geben Sie hier die Stadt ein',
    NOT_FOUND: 'Inhalt nicht gefunden',
    NOT_FOUND_ACTION: 'Einen Schritt zurück',
    FORM_CONFIRMATION_TRACKING_PARAM: 'bestaetigung', // Don't change, used for tracking in GTM
    FORM_CONTACT: {
      Salutation: {
        LABEL: ['Frau', 'Herr'],
      },
      FirstName: {
        LABEL: 'Vorname',
        messages: {
          MISSING_VALUE: 'Bitte geben Sie einen Wert ein.',
        },
      },
      LastName: {
        LABEL: 'Nachname',
        messages: {
          MISSING_VALUE: 'Bitte geben Sie einen Wert ein.',
        },
      },
      Email: {
        LABEL: 'E-Mail Adresse',
        messages: {
          INVALID_VALUE: 'Bitte geben Sie eine gültige E-Mail Adresse ein.',
        },
      },
      Phone: {
        LABEL: 'Telefonnummer',
        messages: {
          INVALID_VALUE: 'Bitte geben Sie eine gültige Telefonnummer ein.',
        },
      },
      PostalCode: {
        LABEL: 'Postleitzahl',
        messages: {
          INVALID_VALUE: 'Bitte geben Sie eine gültige Postleitzahl ein.',
        },
      },
      City: {
        LABEL: 'Stadt',
      },
      AcceptedTerms: {
        LABEL:
          'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
      },
    },
    FORM_INVALID_FIELDS: 'Bitte füllen Sie alle Felder korrekt aus.',
    FORM_SUBMIT_CTA: 'Jetzt Anfrage abschicken',
    FORM_SUBMIT_ERROR: 'Fehler beim Abschicken. Bitte versuchen Sie es erneut.',
    SHOW_MORE: 'Mehr anzeigen',
    SHOW_LESS: 'Weniger anzeigen',
    VAT_ID_GENERIC: 'Unternehmens-Identifikation',
    VAT_ID_SWITZERLAND: 'Unternehmens-Identifikationsnummer (UID)',
    VAT_ID_GERMANY: 'Umsatzsteuer-Identifikationsnummer gem. § 27a UStG',
  },
  English: {
    BACK: 'Back',
    BACK_HOME: 'Back to home',
    HOME: 'Home',
    NEW_REQUEST: 'New request',
    NEXT: 'Next',
    STATE_AUTOCOMPLETE_TITLE: 'Please tell us your city below:',
    STATE_AUTOCOMPLETE_INPUT_PLACEHOLDER: 'Enter city here',
    NOT_FOUND: 'Content not found',
    NOT_FOUND_ACTION: 'Go back',
    FORM_CONFIRMATION_TRACKING_PARAM: 'confirmation', // Don't change, used for tracking in GTM
    FORM_CONTACT: {
      Salutation: {
        LABEL: ['Mrs.', 'Mr.'],
      },
      FirstName: {
        LABEL: 'First name',
        messages: {
          MISSING_VALUE: 'Please enter a value.',
        },
      },
      LastName: {
        LABEL: 'Last name',
        messages: {
          MISSING_VALUE: 'Please enter a value.',
        },
      },
      Email: {
        LABEL: 'E-Mail address',
        messages: {
          INVALID_VALUE: 'Please enter a valid E-Mail address.',
        },
      },
      Phone: {
        LABEL: 'Phone number',
        messages: {
          INVALID_VALUE: 'Please enter a valid phone number.',
        },
      },
      PostalCode: {
        LABEL: 'Postal code',
        messages: {
          INVALID_VALUE: 'Please enter a valid postal code.',
        },
      },
      City: {
        LABEL: 'City',
      },
      AcceptedTerms: {
        LABEL:
          'Yes, I agree to the privacy policy. (Revocation possible at any time)',
      },
    },
    FORM_INVALID_FIELDS: 'Please fill out all required fields.',
    FORM_SUBMIT_CTA: 'Submit request',
    FORM_SUBMIT_ERROR: 'Error submitting. Please try again.',
    SHOW_MORE: 'Show more',
    SHOW_LESS: 'Show less',
    VAT_ID_GENERIC: 'Company Identification',
    VAT_ID_SWITZERLAND: 'Company Identification Number (UID)',
    VAT_ID_GERMANY: 'VAT Identification Number(according to § 27a UStG)',
  },
};
