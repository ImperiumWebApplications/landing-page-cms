import { createGlobalStyle } from 'styled-components';

export const ReadonlyViewInjectedCSS = createGlobalStyle`
  #main-content aside:first-child,
  #main-content aside a,
  #main-content aside button:not(#restore-button),
  nav[aria-label="Content"],
  [data-strapi-header-sticky="true"] > div > div:last-child,
  [data-strapi-header="true"] > div:nth-child(2) > div:last-child {
    display: none;
  }

  nav[aria-label="Content"] + div {
    grid-column-end: 3;
  }
`;
