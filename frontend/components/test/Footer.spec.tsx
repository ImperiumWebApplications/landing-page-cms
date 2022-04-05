import React from 'react';

import { renderWithLayout } from '../../jest.setup';
import { mockedRouter } from '../../mocks/next/router';
import { domainContent } from '../../mocks/data/backend-api';
import { Footer } from '../Footer';

const content = domainContent.data[0].attributes;
const footerData = {
  logo: content.logo,
  brand: content.brand_name,
};

jest.mock('next/router', () => mockedRouter);

describe('Footer', () => {
  test('it should render all elements', () => {
    const { getByText } = renderWithLayout(<Footer content={content} />);
    expect(getByText(footerData.brand, { exact: false })).toBeVisible();
  });
});
