import { createContext, useContext } from 'react';

import type { LandingPageLanguage } from '../lib/strapi';

type LanguageContext = {
  language: LandingPageLanguage;
};

export const LanguageContext = createContext<LanguageContext>({
  language: 'German',
});

export const useLanguageContext = () => useContext(LanguageContext);
