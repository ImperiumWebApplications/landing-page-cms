export type PostalCodeDetails = {
  country_code: string;
  zipcode: string;
  place: string;
  state?: string;
  state_code?: string;
  province?: string;
  province_code?: string;
  community?: string;
  community_code?: string;
  latitude: string;
  longitude: string;
};

export enum Country {
  Switzerland = 'CH',
  Germany = 'DE',
}

export const CountryDetails = {
  [Country.Germany]: {
    topLevelDomain: 'de',
    postalCodeLength: 5,
    isValidPostalCode: /(^\d{5}$)/,
  },
  [Country.Switzerland]: {
    topLevelDomain: 'ch',
    postalCodeLength: 4,
    isValidPostalCode: /(^\d{4}$)/,
  },
} as const;

export const isKnownCountry = (
  country: string,
): country is keyof typeof CountryDetails => {
  return country in CountryDetails;
};
