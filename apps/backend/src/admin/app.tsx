import { registerServiceTypeColumn } from './extensions/service-type-column';

export default {
  config: {
    locales: ['de'],
  },
  bootstrap(app) {
    registerServiceTypeColumn(app);
  },
};
