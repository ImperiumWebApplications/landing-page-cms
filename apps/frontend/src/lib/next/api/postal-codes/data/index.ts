import PostalCodeDataAT from './codes.at.json';
import PostalCodeDataCH from './codes.ch.json';
import PostalCodeDataDE from './codes.de.json';
import PostalCodeDataUS from './codes.us.json';
import PostalCodeDataTH from './codes.th.json';

export const CountryPostalCodes = {
  AT: PostalCodeDataAT,
  DE: PostalCodeDataDE,
  CH: PostalCodeDataCH,
  US: PostalCodeDataUS,
  TH: PostalCodeDataTH,
} as const;
