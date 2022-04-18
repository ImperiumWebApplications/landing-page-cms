import React from 'react';

import { renderWithLayout } from '../../jest.setup';
import {
  QuestionnaireTile,
  QuestionnaireTileProps,
} from '../QuestionnaireTile';

const defaultPropsWithJpg = {
  questionnaire: {
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
} as QuestionnaireTileProps;

const defaultPropsWithSvg = {
  questionnaire: {
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
} as QuestionnaireTileProps;

describe('QuestionnaireTile', () => {
  test('should render tile with correct link', () => {
    const { getByLabelText } = renderWithLayout(
      <QuestionnaireTile {...defaultPropsWithJpg} />,
    );

    const link = getByLabelText('Test_Name');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/fragebogen/test_name-12');
    expect(link).toHaveAttribute('role', 'button');
  });

  test('should render tile with jpg icon', () => {
    const { queryByTestId } = renderWithLayout(
      <QuestionnaireTile {...defaultPropsWithJpg} />,
    );

    const tileImage = queryByTestId('tile-image');
    const tileIcon = queryByTestId('tile-icon');
    expect(tileImage).toBeInTheDocument();
    expect(tileIcon).not.toBeInTheDocument();
  });

  test('should render tile with jpg icon', () => {
    const { queryByTestId } = renderWithLayout(
      <QuestionnaireTile {...defaultPropsWithSvg} />,
    );

    const tileImage = queryByTestId('tile-image');
    const tileIcon = queryByTestId('tile-icon');
    expect(tileImage).not.toBeInTheDocument();
    expect(tileIcon).toBeInTheDocument();
  });

  test('should render nothing if name is missing', () => {
    const props = {
      questionnaire: {
        id: 12,
        attributes: {
          ...defaultPropsWithJpg.questionnaire.attributes,
          name: undefined,
        },
      },
    };

    const { queryByLabelText } = renderWithLayout(
      <QuestionnaireTile {...props} />,
    );

    const link = queryByLabelText('Test_Name');
    expect(link).not.toBeInTheDocument();
  });
});
