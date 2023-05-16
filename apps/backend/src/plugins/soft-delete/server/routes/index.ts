export default [
  {
    method: 'GET',
    path: '/models',
    handler: 'models.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/softDelete',
    handler: 'softDelete.index',
    config: {
      policies: [],
    },
  },
];
