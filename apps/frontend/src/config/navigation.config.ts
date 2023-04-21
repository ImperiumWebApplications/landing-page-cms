export interface NavigationItem {
  href: string;
  label: string;
  openNewTab?: boolean;
}

export const questionnaireRoute = 'fragebogen';
export const appointmentRoute = 'termin';

export const NAVIGATION_ANCHOR = {
  Ablauf: 'ablauf',
  FAQ: 'faq',
  Kundenstimmen: 'kundenstimmen',
  Mission: 'mission',
  Prinzip: 'prinzip',
  Services: 'services',
};

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Startseite',
  },
  {
    href: `/#${NAVIGATION_ANCHOR.Prinzip}`,
    label: 'Prinzip',
  },
  {
    href: `/#${NAVIGATION_ANCHOR.Mission}`,
    label: 'Unsere Mission',
  },
  {
    href: `/#${NAVIGATION_ANCHOR.Ablauf}`,
    label: 'Der Ablauf',
  },
  {
    href: `/#${NAVIGATION_ANCHOR.Kundenstimmen}`,
    label: 'Kundenstimmen',
  },
  {
    href: `/#${NAVIGATION_ANCHOR.FAQ}`,
    label: 'Häufig gestelle Fragen',
  },
];

export const footerNavigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Startseite',
  },
  {
    href: '/impressum',
    label: 'Impressum',
  },
  {
    href: '/datenschutz',
    label: 'Datenschutz',
  },
];
