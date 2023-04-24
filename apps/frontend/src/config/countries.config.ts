export type PostalCodeDetails = {
  code: string;
  place: string;
};

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
