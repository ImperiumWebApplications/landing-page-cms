import { Country, CountryDetails } from '../config/countries.config';

export const getCountryDetails = (countries?: Country[] | undefined) => {
  return (countries ?? [])
    .map((country) => CountryDetails[country])
    .filter((v) => v !== undefined);
};
