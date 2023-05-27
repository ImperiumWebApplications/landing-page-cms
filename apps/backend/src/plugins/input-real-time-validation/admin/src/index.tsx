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
      options: {
        base: [
          {
            sectionTitle: {
              id: `${pluginId}.maxLength.section`,
              defaultMessage: 'Input properties',
            },
            items: [
              {
                intlLabel: {
                  id: `${pluginId}.maxLength.label`,
                  defaultMessage: 'Max Length',
                },
                name: 'options.maxLength',
                type: 'number',
                value: 150, // default value
              },
            ],
          },
          {
            intlLabel: {
              id: `${pluginId}.displayName.label`,
              defaultMessage: 'Display Name',
            },
            name: 'options.displayName',
            type: 'string',
            value: 'Default Display Name',
          },
        ],
      },
    });
  },

  bootstrap(app: any) {},

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
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
