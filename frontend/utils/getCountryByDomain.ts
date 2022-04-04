import { Country, CountryDetails } from '../config/countries.config';

export const getCountryByDomain = (domain: string) => {
  if (isLocalEnvironment(domain)) return Country.Germany;

  const topLevelDomain = domain.split('.').pop();

  const foundCountryIndex = Object.values(CountryDetails).findIndex(
    (country) => country.topLevelDomain === topLevelDomain,
  );

  return foundCountryIndex !== -1
    ? (Object.keys(CountryDetails)[foundCountryIndex] as Country)
    : undefined;
};

const isLocalEnvironment = (domain: string) =>
  domain === 'localhost:3000' ||
  process.env.NODE_ENV !== 'production' ||
  process.env.APP_ENV === 'test';
