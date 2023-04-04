import React from 'react';
import { renderWithLayout } from '../../../../../../jest.setup';
import {
  QuestionnaireTiles,
  QuestionnaireTilesProps,
} from '../QuestionnaireTiles';

const defaultPropsWithJpg: QuestionnaireTilesProps = {
  content: {
    questionnaires: {
      data: [
        {
          id: 12,
          attributes: {
            name: 'Test_Name',
            description: 'TestDesc',
            icon: {
              data: {
                id: 131,
                // @ts-ignore
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
      ],
    },
  },
};

const defaultPropsWithSvg: QuestionnaireTilesProps = {
  content: {
    questionnaires: {
      data: [
        {
          id: 12,
          attributes: {
            name: 'Test_Name',
            description: 'TestDesc',
            icon: {
              data: {
                id: 131,
                //@ts-ignore
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
      ],
    },
  },
};

describe('QuestionnaireTiles', () => {
  test('should render tile with correct link', () => {
    const { getByRole } = renderWithLayout(
      <QuestionnaireTiles {...defaultPropsWithJpg} />,
    );

    const link = getByRole('button');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Test_Name');
    expect(link).toHaveAttribute('href', '/fragebogen/test_name-12');
    expect(link).toHaveAttribute('role', 'button');
  });

  test('should render tile with jpg icon', () => {
    const { queryByTestId } = renderWithLayout(
      <QuestionnaireTiles {...defaultPropsWithJpg} />,
    );

    const tileImage = queryByTestId('hero-tile-image');
    const tileIcon = queryByTestId('hero-tile-icon');
    expect(tileImage).toBeInTheDocument();
    expect(tileIcon).not.toBeInTheDocument();
  });

  test('should render tile with svg icon', async () => {
    const { queryByTestId, findByTestId } = renderWithLayout(
      <QuestionnaireTiles {...defaultPropsWithSvg} />,
    );

    const tileImage = queryByTestId('hero-tile-image');
    expect(tileImage).not.toBeInTheDocument();
    await findByTestId('hero-tile-icon');
  });

  test('should render nothing if name is missing', () => {
    const props: QuestionnaireTilesProps = {
      // @ts-ignore
      content: {
        questionnaires: {
          data: [
            {
              id: 12,
              attributes: {
                ...defaultPropsWithJpg.content?.questionnaires?.data[0]
                  .attributes,
                name: null,
              },
            },
          ],
        },
      },
    };

    const { queryByLabelText } = renderWithLayout(
      <QuestionnaireTiles {...props} />,
    );

    const link = queryByLabelText('Test_Name');
    expect(link).not.toBeInTheDocument();
  });
});
