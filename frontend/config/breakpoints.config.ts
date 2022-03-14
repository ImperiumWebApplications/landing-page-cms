const sizes = {
  xs: '360px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1920px',
};

export const devices = {
  xs: `min-width: ${sizes.xs}`,
  sm: `min-width: ${sizes.sm}`,
  md: `min-width: ${sizes.md}`,
  lg: `min-width: ${sizes.lg}`,
  xl: `min-width: ${sizes.xl}`,
  xxl: `min-width: ${sizes.xxl}`,
  specifics: {
    flatDesktop: `min-width: ${sizes.lg}) and (max-height: 840px`,
  },
};
