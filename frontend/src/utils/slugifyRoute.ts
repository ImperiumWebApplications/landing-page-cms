import slugify from 'slugify';

export const slugifyRoute = (name: string) => {
  return slugify(name, { locale: 'de', lower: true });
};
