import React from 'react';
import { renderWithLayout } from '../../../../../jest.setup';

import { Tile, TileProps } from '../Tile';

const defaultPropsWithJpg = {
  content: {
    id: 12,
    attributes: {
      name: 'Test_Name',
      description: 'TestDesc',
      icon: {
        data: {
          id: 131,
          attributes: {
            name: 'work.jpg',
            alternativeText: 'work.jpg',
            caption: 'work.jpg',
            ext: '.jpg',
            width: 124,
            height: 124,
            url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/work_a81a4126a1.jpg',
          },
        },
      },
    },
  },
} as TileProps;

const defaultPropsWithSvg = {
  content: {
    id: 12,
    attributes: {
      name: 'Test_Name',
      description: 'TestDesc',
      icon: {
        data: {
          id: 131,
          attributes: {
            name: 'work.svg',
            alternativeText: 'work.svg',
            caption: 'work.svg',
            ext: '.svg',
            width: 124,
            height: 124,
            url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/work_a81a4126a1.svg',
          },
        },
      },
    },
  },
} as TileProps;

describe('Tile', () => {
  test('should render tile with correct link', () => {
    const { getByLabelText } = renderWithLayout(
      <Tile {...defaultPropsWithJpg} />,
    );

    const link = getByLabelText('Test_Name');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/fragebogen/test_name-12');
    expect(link).toHaveAttribute('role', 'button');
  });

  test('should render tile with jpg icon', () => {
    const { queryByTestId } = renderWithLayout(
      <Tile {...defaultPropsWithJpg} />,
    );

    const tileImage = queryByTestId('tile-image');
    const tileIcon = queryByTestId('tile-icon');
    expect(tileImage).toBeInTheDocument();
    expect(tileIcon).not.toBeInTheDocument();
  });

  test('should render tile with jpg icon', () => {
    const { queryByTestId } = renderWithLayout(
      <Tile {...defaultPropsWithSvg} />,
    );

    const tileImage = queryByTestId('tile-image');
    const tileIcon = queryByTestId('tile-icon');
    expect(tileImage).not.toBeInTheDocument();
    expect(tileIcon).toBeInTheDocument();
  });

  test('should render nothing if name is missing', () => {
    const props = {
      content: {
        id: 12,
        attributes: {
          ...defaultPropsWithJpg.content.attributes,
          name: undefined,
        },
      },
    };

    const { queryByLabelText } = renderWithLayout(<Tile {...props} />);

    const link = queryByLabelText('Test_Name');
    expect(link).not.toBeInTheDocument();
  });
});
