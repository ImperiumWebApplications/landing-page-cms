import { createGlobalStyle } from 'styled-components';

/**
 * Hide editable elements in readonly view.
 * This is a workaround to reuse the existing Strapi edit view.
 */

export const ReadonlyViewInjectedCSS = createGlobalStyle`
  #main-content aside:first-child,
  #main-content aside a,
  #main-content aside button:not(#restore-button),
  #main-content input[aria-autocomplete="list"],
  /* Hide all buttons except: restore button, color pickers, image actions */
  #main-content button:not(#restore-button):not([aria-controls="color-picker-value"]):not([tabindex="0"]):not([tabindex="1"]),
  /** Hide select dropdown buttons */
  #react-select-4-placeholder,
  [class$="ValueContainer"],
  [class$="IndicatorsContainer"],
  /** Hide left-side pane for selecting collections */
  nav[aria-label="Content"],
  /** Hide buttons in header */
  [data-strapi-header-sticky="true"] > div > div:last-child,
  [data-strapi-header="true"] > div:nth-child(2) > div:last-child {
    display: none !important;
  }

  nav[aria-label="Content"] + div {
    grid-column-end: 3;
  }
`;
