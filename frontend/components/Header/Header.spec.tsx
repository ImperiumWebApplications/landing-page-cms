import { fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  navigationItems,
  questionnaireRoute,
} from '../../config/navigation.config';

import { renderWithLayout } from '../../jest.setup';
import { useRouterMock } from '../../mocks/lib/next/router';
import { content } from '../../mocks/lib/strapi/data';
import { setupIntersectionObserverMock } from '../../mocks/window/intersectionObserver';
import { Header } from './Header';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
    (useRouter as jest.Mock).mockReturnValue(useRouterMock);
  });

  test('should show logo and button', () => {
    const { getByAltText, getByLabelText, getByTestId } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const logoImage = getByAltText('logo.png');
    expect(logoImage).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Flanding-pages-images-local.s3.eu-central-1.amazonaws.com%2Flogo_485181aa26.png&w=640&q=75',
    );

    const logoLink = getByLabelText('Homepage');
    expect(logoLink).toHaveAttribute('href', '/');

    const button = getByTestId('button');
    console.log(button);
    expect(button).toHaveAttribute('href', '/fragebogen');
    expect(button).toHaveTextContent('Lassen Sie sich beraten');
    expect(button).toHaveAttribute('role', 'button');
  });

  test('should only show logo on funnel route', () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...useRouterMock,
      pathname: questionnaireRoute,
    });

    const { getByAltText, getByLabelText, queryByTestId } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const logoImage = getByAltText('logo.png');
    expect(logoImage).toBeInTheDocument();
    const logoLink = getByLabelText('Homepage');
    expect(logoLink).toBeInTheDocument();

    const button = queryByTestId('button');
    expect(button).not.toBeInTheDocument();
  });

  test('should contain mobile navigation button', () => {
    const { getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );
    expect(getByLabelText('Mobile Navigation Toggle')).toBeInTheDocument();
  });

  test('should open mobile navigation on click', () => {
    const { getByLabelText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    const toggle = getByLabelText('Mobile Navigation Toggle');
    const sidebar = getByLabelText('sidebar');
    expect(sidebar).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(toggle);
    expect(sidebar).toHaveAttribute('aria-hidden', 'false');

    fireEvent.click(toggle);
    expect(sidebar).toHaveAttribute('aria-hidden', 'true');
  });

  test('should contain mobile navigation items', () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...useRouterMock,
      pathname: '/datenschutz',
    });

    const { getByText } = renderWithLayout(
      <Header content={content.data[0].attributes} />,
    );

    navigationItems.forEach((item) => {
      expect(getByText(item.label)).toHaveAttribute('href', item.href);
      if (item.href === '/datenschutz')
        expect(getByText(item.label)).toHaveClass('text-secondary');
    });
  });
});
