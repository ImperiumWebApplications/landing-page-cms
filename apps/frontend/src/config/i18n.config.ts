/** Language Configuration */

export enum Language {
  German = 'German',
  English = 'English',
}

export const QuestionnaireConfig = {
  [Language.German]: {
    route: 'fragebogen',
    entryQuestionFallback: 'Was suchen Sie?',
  },
  [Language.English]: {
    route: 'fragebogen',
    entryQuestionFallback: 'What are you looking for?',
  },
};

export const FooterConfig = {
  [Language.German]: {
    revokeConsentLabel: 'Cookie-Erlaubnis widerrufen',
    navigation: [
      {
        href: '/',
        label: 'Startseite',
      },
      {
        href: '/impressum',
        label: 'Impressum',
      },
      {
        href: '/datenschutz',
        label: 'Datenschutz',
      },
    ],
  },
  [Language.English]: {
    revokeConsentLabel: 'Revoke cookie consent',
    navigation: [
      {
        href: '/',
        label: 'Home',
      },
      {
        href: '/impressum',
        label: 'Imprint',
      },
      {
        href: '/datenschutz',
        label: 'Privacy Policy',
      },
    ],
  },
};

/** Country Configuration */

export enum Country {
  Austria = 'AT',
  Germany = 'DE',
  Switzerland = 'CH',
}

export const CountryDetails = {
  [Country.Austria]: {
    postalCodeLength: 4,
    isValidPostalCode: /(^\d{4}$)/,
  },
  [Country.Germany]: {
    postalCodeLength: 5,
    isValidPostalCode: /(^\d{5}$)/,
  },
  [Country.Switzerland]: {
    postalCodeLength: 4,
    isValidPostalCode: /(^\d{4}$)/,
  },
} as const;

export const isKnownCountry = (
  country: string,
): country is keyof typeof CountryDetails => {
  return country in CountryDetails;
};

export type PostalCodeDetails = {
  code: string;
  place: string;
};
