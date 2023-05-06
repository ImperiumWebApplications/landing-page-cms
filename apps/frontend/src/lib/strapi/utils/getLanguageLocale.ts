import { LandingPageLanguage } from '../model';

export const getLanguageLocale = (language?: LandingPageLanguage | null) => {
  switch (language) {
    case 'German':
      return 'de';
    case 'English':
      return 'en';
    default:
      return 'de';
  }
};
