export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'users-permissions': {
    enabled: false,
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  'multi-select-field': {
    enabled: true,
    resolve: './src/plugins/multi-select-field',
  },
  'soft-delete': {
    enabled: true,
    resolve: './src/plugins/soft-delete',
    config: {
      // Model must include a "deleted" boolean field in the model's schema
      // "deleted" field must be set as private and default=false
      models: ['landing-page', 'questionnaire', 'lead'],
    },
  },
  'input-real-time-validation': {
    enabled: true,
    resolve: './src/plugins/input-real-time-validation',
  },
});
