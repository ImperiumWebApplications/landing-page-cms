module.exports = ({ env }) => ({
  url: '/',
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f34db2dd79cefd80214cd5cb8521a803'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', '234db2dds3cef480214cd5cb8521a803'),
  },
});
