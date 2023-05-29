import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const IS_CLONE_ROUTE_REGEX = /(\/create\/clone\/[0-9]+)/;

const InjectedUniqueDomainHook: React.FC = () => {
  const { pathname } = useLocation();
  const { initialData, onChange } = useCMEditViewDataManager();

  useLayoutEffect(() => {
    if (!IS_CLONE_ROUTE_REGEX.test(pathname) || !initialData.domain) return;

    const updatedDomain = addCopySuffix(initialData.domain);

    onChange({
      target: { name: 'domain', value: updatedDomain ?? initialData.domain },
    });
  }, []);

  return null;
};

export default InjectedUniqueDomainHook;

/** HELPER */

const addCopySuffix = (domain?: string): string | undefined => {
  if (!domain) return undefined;

  const copyIndexRegex = /-copy-(\d+)$/;
  const match = domain.match(copyIndexRegex);

  if (!match) return domain.concat('-copy-1');

  const copyIndex = Number(match[1]) + 1;

  return domain.replace(copyIndexRegex, `-copy-${copyIndex}`);
};
