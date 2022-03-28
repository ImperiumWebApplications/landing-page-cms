import { Country, CountryDetails } from '../config/countries.config';

export const getCountryByDomain = (domain: string) => {
  if (process.env.NODE_ENV !== 'production') return Country.Switzerland;

  const topLevelDomain = domain.split('.').pop();

  const foundCountryIndex = Object.values(CountryDetails).findIndex(
    (country) => country.topLevelDomain === topLevelDomain,
  );

  return foundCountryIndex !== -1
    ? Object.keys(CountryDetails)[foundCountryIndex]
    : undefined;
};
