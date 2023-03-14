export interface NavigationItem {
  href: string;
  label: string;
  openNewTab?: boolean;
}

export const questionnaireRoute = 'fragebogen';
export const appointmentRoute = 'termin';

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Homepage',
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
