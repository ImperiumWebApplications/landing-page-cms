import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { LandingPage } from '../backend-api';
import { FontConfig } from './font.config';

export const extractTheme = (content: LandingPage) => {
  return {
    font: `"${FontConfig.fontName}", sans-serif`,
    colors: {
      primary: content.color_primary ?? 'black',
      secondary: content.color_secondary ?? 'red',
      tertiary: content.color_tertiary ?? 'grey',
      text: content.color_text ?? 'black',
    },
  };
};

export type LeadquelleTheme = ReturnType<typeof extractTheme>;

export const GlobalStyle = createGlobalStyle<{ theme: LeadquelleTheme }>`
  /** Reset CSS */
  ${reset}
  /** Typography */
  body {
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.text};
  }
`;
