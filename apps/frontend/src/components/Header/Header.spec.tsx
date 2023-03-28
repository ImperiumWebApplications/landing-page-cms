import { fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  navigationItems,
  questionnaireRoute,
} from '../../config/navigation.config';

import { renderWithLayout } from '../../../jest.setup';
import { useRouterMock } from '../../../mocks/lib/next/router';
import { content } from '../../../mocks/lib/strapi/data';
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
    const { getByAltText, getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const logoImage = getByAltText('craftsman24_logo.png');
    expect(logoImage).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Flanding-pages-images-local.s3.eu-central-1.amazonaws.com%2Fcraftsman24_logo_57de4fbf9d.png&w=384&q=75',
    );

    const logoLink = getByLabelText('Homepage');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('should show logo on funnel route', () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...useRouterMock,
      pathname: questionnaireRoute,
    });

    const { getByAltText, getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const logoImage = getByAltText('craftsman24_logo.png');
    expect(logoImage).toBeInTheDocument();
    const logoLink = getByLabelText('Homepage');
    expect(logoLink).toBeInTheDocument();
  });

  test('should contain mobile navigation button', () => {
    const { getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );
    expect(getByLabelText('Toggle Navigation')).toBeInTheDocument();
  });

  test('should open mobile navigation on click', () => {
    const { getByRole, getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const toggle = getByLabelText('Toggle Navigation');

    act(() => {
      fireEvent.click(toggle);
    });

    const menu = getByRole('menu');
    expect(menu).toHaveAttribute('data-headlessui-state', 'open');
  });

  test('should contain navigation items', () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...useRouterMock,
      pathname: '/datenschutz',
    });

    const { getByText, getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const toggle = getByLabelText('Toggle Navigation');

    act(() => {
      fireEvent.click(toggle);
    });

    navigationItems.forEach((item) => {
      expect(getByText(item.label)).toHaveAttribute('href', item.href);
      if (item.href === '/datenschutz')
        expect(getByText(item.label)).toHaveClass('text-primary');
    });
  });
});
