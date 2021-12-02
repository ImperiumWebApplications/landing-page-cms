import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { LeadquelleTheme, theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: LeadquelleTheme }>`
  /** Reset CSS */
  ${reset}
  /** Typography */
  body {
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.main};
  }
`;
