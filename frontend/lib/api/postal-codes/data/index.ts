import PostalCodeDataCH from './codes.ch.json';
import PostalCodeDataDE from './codes.de.json';

export const CountryPostalCodes = {
  DE: PostalCodeDataDE,
  CH: PostalCodeDataCH,
} as const;
