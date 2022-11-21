import { sortQuestionnairesByPriority } from '../sortQuestionnaires';

const defaultData = [
  {
    id: 3,
    attributes: {
      name: 'Last',
      createdAt: '2021-12-03T10:20:46.466Z',
      updatedAt: '2022-01-04T16:42:24.040Z',
      publishedAt: '2021-12-03T10:38:54.157Z',
      priority: 6,
    },
  },
  {
    id: 1,
    attributes: {
      name: 'First',
      createdAt: '2021-12-03T10:20:46.466Z',
      updatedAt: '2022-01-04T16:42:24.040Z',
      publishedAt: '2021-12-03T10:38:54.157Z',
      priority: 2,
    },
  },
  {
    id: 2,
    attributes: {
      name: 'Second',
      createdAt: '2021-12-03T10:20:46.466Z',
      updatedAt: '2022-01-04T16:42:24.040Z',
      publishedAt: '2021-12-03T10:38:54.157Z',
      priority: 3,
    },
  },
];

describe('sortQuestionnairesByPriority', () => {
  it('should sort questionnaires by priority', () => {
    expect(sortQuestionnairesByPriority(defaultData)).toEqual([
      {
        id: 1,
        attributes: {
          name: 'First',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 2,
        },
      },
      {
        id: 2,
        attributes: {
          name: 'Second',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 3,
        },
      },
      {
        id: 3,
        attributes: {
          name: 'Last',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 6,
        },
      },
    ]);
  });
  it('should sort questionnaires by priority with missing values', () => {
    const data = [
      ...defaultData,
      {
        id: 4,
        attributes: {
          name: 'Last',
          priority: null,
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
        },
      },
      {
        id: 5,
        attributes: {
          name: 'Last',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 1,
        },
      },
    ];
    expect(sortQuestionnairesByPriority(data)).toEqual([
      {
        id: 5,
        attributes: {
          name: 'Last',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 1,
        },
      },
      {
        id: 1,
        attributes: {
          name: 'First',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 2,
        },
      },
      {
        id: 2,
        attributes: {
          name: 'Second',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 3,
        },
      },
      {
        id: 4,
        attributes: {
          name: 'Last',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: null,
        },
      },
      {
        id: 3,
        attributes: {
          name: 'Last',
          createdAt: '2021-12-03T10:20:46.466Z',
          updatedAt: '2022-01-04T16:42:24.040Z',
          publishedAt: '2021-12-03T10:38:54.157Z',
          priority: 6,
        },
      },
    ]);
  });
});
