import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import 'jest-dom/extend-expect';

import { extractTheme, GlobalStyle } from './config/theme.config';

const LayoutRender: React.FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={extractTheme()}>
      <GlobalStyle isFunnelRoute={false} />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export const renderWithLayout = (
  ui: ReactElement<string, string>,
  options?: RenderOptions,
) =>
  render(ui, {
    wrapper: LayoutRender,
    ...options,
  });

export * from '@testing-library/react';
