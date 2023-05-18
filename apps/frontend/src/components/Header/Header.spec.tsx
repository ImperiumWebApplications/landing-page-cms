import { fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import { questionnaireRoute } from '../../config/navigation.config';

import { renderWithLayout } from '../../../jest.setup';
import { useRouterMock } from '../../../mocks/lib/next/router';
import { content, staticContent } from '../../../mocks/lib/strapi/data';
import { setupIntersectionObserverMock } from '../../../mocks/window/intersectionObserver';
import { Header } from './Header';
import { act } from 'react-dom/test-utils';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
    (useRouter as jest.Mock).mockReturnValue(useRouterMock);
  });

  test('should show logo', () => {
    const { getByLabelText, getByTestId } = renderWithLayout(
      <Header
        content={content.data[0].attributes}
        staticContent={staticContent.data.attributes}
      />,
    );

    const logo = getByTestId('logo-svg');
    const svg = logo.querySelector('[data-src]');
    expect(svg).toHaveAttribute(
      'data-src',
      'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/leadquelle_logo_7a57e30208.svg',
    );

    const logoLink = getByLabelText('Homepage');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('should show logo on funnel route', () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...useRouterMock,
      pathname: questionnaireRoute,
    });

    const { getByTestId, getByLabelText } = renderWithLayout(
      <Header
        content={content.data[0].attributes}
        staticContent={staticContent.data.attributes}
      />,
    );

    const logoSvg = getByTestId('logo-svg');
    expect(logoSvg).toBeInTheDocument();
    const logoLink = getByLabelText('Homepage');
    expect(logoLink).toBeInTheDocument();
  });

  test('should contain mobile navigation button', () => {
    const { getByLabelText } = renderWithLayout(
      <Header
        content={content.data[0].attributes}
        staticContent={staticContent.data.attributes}
      />,
    );
    expect(getByLabelText('Toggle Navigation')).toBeInTheDocument();
  });

  test('should open mobile navigation on click', () => {
    const { getByRole, getByLabelText } = renderWithLayout(
      <Header
        content={content.data[0].attributes}
        staticContent={staticContent.data.attributes}
      />,
    );

    const toggle = getByLabelText('Toggle Navigation');

    act(() => {
      fireEvent.click(toggle);
    });

    const menu = getByRole('menu');
    expect(menu).toHaveAttribute('data-headlessui-state', 'open');
  });

  test('should contain navigation items', () => {
    const { getByText, getByLabelText } = renderWithLayout(
      <Header
        content={content.data[0].attributes}
        staticContent={staticContent.data.attributes}
      />,
    );

    const toggle = getByLabelText('Toggle Navigation');

    act(() => {
      fireEvent.click(toggle);
    });

    expect(getByText('Startseite')).toHaveAttribute('href', '/');
    expect(getByText('Ablauf')).toHaveAttribute('href', '/#ablauf');
    expect(getByText('Prinzip')).toHaveAttribute('href', '/#prinzip');
    expect(getByText('Unsere Mission')).toHaveAttribute('href', '/#mission');
    expect(getByText('Kundenstimmen')).toHaveAttribute(
      'href',
      '/#kundenstimmen',
    );
    expect(getByText('Häufig gestellte Fragen')).toHaveAttribute(
      'href',
      '/#faq',
    );
  });
});
