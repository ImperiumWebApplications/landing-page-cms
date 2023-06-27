import PostalCodeDataAT from './codes.at.json';
import PostalCodeDataCH from './codes.ch.json';
import PostalCodeDataDE from './codes.de.json';
import PostalCodeDataUS from './codes.us.json';

export const CountryPostalCodes = {
  AT: PostalCodeDataAT,
  DE: PostalCodeDataDE,
  CH: PostalCodeDataCH,
  US: PostalCodeDataUS,
} as const;
