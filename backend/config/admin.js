module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f34db2dd79cefd80214cd5cb8521a803'),
  },
});
