import { CountryDetails } from '../config/countries.config';

export const getCountryDetails = (countries?: string[] | null) => {
  return (countries ?? [])
    .map((country) => CountryDetails[country as keyof typeof CountryDetails])
    .filter((v) => v !== undefined);
};
