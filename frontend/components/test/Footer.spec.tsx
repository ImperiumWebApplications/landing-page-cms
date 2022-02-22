import React from 'react';

import { renderWithLayout } from '../../jest.setup';
import { mockedRouter } from '../../mocks/next/router';
import { domainContent } from '../../mocks/backend-api';
import { Footer } from '../Footer';

const footerData = {
  logo: domainContent.logo_footer,
  brand: domainContent.brand_name,
};

jest.mock('next/router', () => mockedRouter);

describe('Footer', () => {
  test('it should render all elements', () => {
    const { getByText } = renderWithLayout(<Footer content={domainContent} />);
    expect(getByText(footerData.brand, { exact: false })).toBeVisible();
  });
});
