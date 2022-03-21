export const isPostalCodeFormat = (code: string | number) => {
  if (typeof code === 'number') code = `${code}`;
  return /(^\d{5}$)|(^\d{4}$)/.test(code);
};
