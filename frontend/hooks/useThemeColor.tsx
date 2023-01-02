/**
 * Returns the given theme color as a hex string.
 */

import { useLayoutEffect, useMemo, useState } from 'react';

export const useThemeColor = (color: 'primary' | 'secondary' | 'tertiary') => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const primaryHex = useMemo(() => {
    return mounted
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(`--color-${color}`)
          .trim()
      : undefined;
  }, [mounted, color]);

  return primaryHex;
};
