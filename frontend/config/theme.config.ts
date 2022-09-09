import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

import type { LandingPage } from '../backend-api';
import { FontConfig } from './font.config';
import { devices } from './breakpoints.config';

export const extractTheme = (content?: LandingPage) => {
  return {
    borderRadius: '0.5rem',
    maxPageWidth: '1400px',
    font: `"${FontConfig.fontName}", sans-serif`,
    colors: {
      primary: content?.color_primary ?? '#000000',
      secondary: content?.color_secondary ?? '#000000',
      tertiary: content?.color_tertiary ?? '#232323',
      text: content?.color_text ?? '#000000',
      success: '#4BB543',
      error: '#ff9999',
    },
  };
};

export type LeadquelleTheme = ReturnType<typeof extractTheme>;

export const GlobalStyle = createGlobalStyle<{
  theme: LeadquelleTheme;
  isFunnelRoute: boolean;
}>`
  /** Reset CSS */
  ${reset}

  * {
    box-sizing: border-box;
  }

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
  strong {
    font-weight: 700;
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
  h4 {
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin: 0;
  }
  h5, h6 {
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.25rem;
    margin: 0;
    margin-block-end: -0.5em;
  }
  ul, ol {
    margin-left: 1.25rem;
    text-indent: -1.25rem;
    line-height: 1em;
    margin-block-start: -1em;
  }
  ul li:before {
    content: '';
    background-color: #e6b432;
    display: inline-block;
    border-radius: 9999px;
    margin-right: 0.625rem;
    height: 0.5rem;
    width: 0.5rem;
    vertical-align: middle;
  }
  ol {
    list-style-type: decimal;
  }
  ol li:before {
    content: '';
    display: inline-block;
    margin-right: 1rem;
    height: 0.5rem;
    width: 0.5rem;
  }
  blockquote {
    border-left: 4px solid #ccc;
    padding: 0 10px;
    margin: 0;
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

  input:focus {
    outline-offset: -2px;
    outline-width: 1px;
    outline-color: ${({ theme }) => theme.colors.secondary};
  }
`;
