import { Country, CountryDetails } from '../config/countries.config';
import { isDevEnvironment } from './isDevEnvironment';
import { isTestEnvironment } from './isTestEnvironment';

export const getCountryByDomain = (domain?: string | null) => {
  if (!domain || isDevEnvironment(domain) || isTestEnvironment())
    return Country.Germany;

  const topLevelDomain = domain.split('.').pop();

  const foundCountryIndex = Object.values(CountryDetails).findIndex(
    (country) => country.topLevelDomain === topLevelDomain,
  );

  return foundCountryIndex !== -1
    ? (Object.keys(CountryDetails)[foundCountryIndex] as Country)
    : undefined;
};
