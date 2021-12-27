import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { LandingPage } from '../backend-api';
import { FontConfig } from './font.config';
import { devices } from './breakpoints.config';

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
    white-space: pre-wrap;
    scroll-behavior: smooth;
    @media screen and (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }
  #__next {
    min-height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;
  }
  .content-wrapper {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.maxPageWidth};
    padding: 1rem;
    @media screen and (${devices.md}) {
      padding: 2rem;
    }
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
  p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
  h1 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    @media screen and (${devices.md}) {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }
  h2 {
    font-weight: 700;
    font-size: 1.75rem;
    line-height: 2.25rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    @media screen and (${devices.md}) {
      font-size: 2rem;
      line-height: 2.5rem;
    }
  }
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    @media screen and (${devices.md}) {
      font-size: 1.75rem;
      line-height: 2.25rem;
    }
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
