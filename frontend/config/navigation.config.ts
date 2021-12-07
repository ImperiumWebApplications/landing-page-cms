interface NavigationItem {
  href: string;
  label: string;
  openNewTab?: boolean;
}

export const questionnaireRoute = 'fragebogen';

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

export const headerButton: NavigationItem = {
  href: `/${questionnaireRoute}`,
  label: 'Lassen Sie sich beraten',
};

export const videoButton: NavigationItem = {
  href: `/${questionnaireRoute}`,
  label: 'Beratung starten',
};
