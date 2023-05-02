import { CountryDetails } from '../config/i18n.config';

export const getCountryDetails = (countries?: string[] | null) => {
  return (countries ?? [])
    .map((country) => CountryDetails[country as keyof typeof CountryDetails])
    .filter((v) => v !== undefined);
};
