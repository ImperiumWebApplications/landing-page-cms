import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';


const LayoutRender: React.FC<{ children?: React.ReactElement }> = ({
  children,
}) => {
  return <main>{children}</main>;
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
