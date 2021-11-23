import pluginPkg from '../../package.json';
import pluginId from './pluginId';

import { ColorPicker } from './components/ColorPicker';

export default (strapi) => {
  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: 'A color picker for selecting theme colors',
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    initializer: () => null,
    injectedComponents: [],
    isReady: true,
    leftMenuLinks: [],
    leftMenuSections: [],
    mainComponent: null,
    name: pluginPkg.strapi.name,
    preventComponentRendering: false,
    trads: {},
  };

  strapi.registerField({ type: 'color-picker', Component: ColorPicker });

  return strapi.registerPlugin(plugin);
};
