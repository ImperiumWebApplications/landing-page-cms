export enum Country {
  Switzerland = 'CH',
  Germany = 'DE',
}

export const getCountryByDomain = (domain: string) => {
  if (process.env.NODE_ENV !== 'production') return Country.Germany;

  const topLevelDomain = domain.split('.').pop();

  switch (topLevelDomain) {
    case 'de':
      return Country.Germany;
    case 'ch':
      return Country.Switzerland;
    default:
      return undefined;
  }
};
