import PostalCodeDataAT from './codes.at.json';
import PostalCodeDataCH from './codes.ch.json';
import PostalCodeDataDE from './codes.de.json';

export const CountryPostalCodes = {
  AT: PostalCodeDataAT,
  DE: PostalCodeDataDE,
  CH: PostalCodeDataCH,
} as const;
