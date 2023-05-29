import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';

import InjectedUniqueDomainHook from './components/InjectedUniqueDomainHook';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent('editView', 'informations', {
      name: 'injected-unique-domain-hook',
      Component: InjectedUniqueDomainHook,
    });
  },
};
