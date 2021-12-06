import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { LandingPage } from '../backend-api';
import { FontConfig } from './font.config';

export const extractTheme = (content: LandingPage) => {
  return {
    borderRadius: '0.5rem',
    maxPageWidth: '1400px',
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

  /** Layout */
  html, body {
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
  }
  #__next {
    min-height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;
  }
  .content-wrapper {
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.maxPageWidth};
  }

  /** Typography */
  body {
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.text};
  }
  a {
    font-weight: 700;
    text-decoration: none;
  }

  /** Global Elements */
  .shining-button {
    position: relative;
    overflow: hidden;

    &::after {
      background: #fff;
      content: '';
      height: 155px;
      left: -75px;
      opacity: 0.2;
      position: absolute;
      top: -50px;
      transform: rotate(35deg);
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
      width: 50px;
      z-index: 15;
    }
    &:hover::after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`;
