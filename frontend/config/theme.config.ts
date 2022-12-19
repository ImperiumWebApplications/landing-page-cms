import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

import { devices } from './breakpoints.config';

type ConfigureThemeProps = {
  colors?: {
    primary?: string | null;
    secondary?: string | null;
    tertiary?: string | null;
    text?: string | null;
  };
};

export const configureTheme = (props: ConfigureThemeProps = {}) => {
  return {
    borderRadius: '0.5rem',
    maxPageWidth: '1400px',
    font: `"Overpass", sans-serif`,
    colors: {
      primary: props.colors?.primary ?? '#000000',
      secondary: props.colors?.secondary ?? '#333333',
      tertiary: props.colors?.tertiary ?? '#E2E2E2',
      text: props.colors?.text ?? '#666666',
      success: '#4BB543',
      error: '#ff9999',
    },
  };
};

export type LeadquelleTheme = ReturnType<typeof configureTheme>;

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
`;
