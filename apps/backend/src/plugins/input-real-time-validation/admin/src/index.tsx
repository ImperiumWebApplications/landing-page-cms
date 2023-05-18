import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: 'input-real-time-validation',
      pluginId: pluginId,
      type: 'string',
      components: {
        Input: async () => import('./components/InputRealTimeValidation'),
      },
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      intlDescription: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
    });
  },

  bootstrap(app: any) { },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
