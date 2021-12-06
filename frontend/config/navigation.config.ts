interface NavigationItem {
  href: string;
  label: string;
  openNewTab?: boolean;
}

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
  href: '/fragenbogen',
  label: 'Lassen Sie sich beraten',
};
