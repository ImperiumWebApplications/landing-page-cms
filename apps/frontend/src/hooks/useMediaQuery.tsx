import React from 'react';

export function useMediaQuery(query: string): boolean {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return false;
  }

  const mediaQuery = window.matchMedia(query);
  // eslint-disable-next-line
  const [match, setMatch] = React.useState<boolean>(mediaQuery.matches);

  // eslint-disable-next-line
  React.useEffect(() => {
    function handleMatch() {
      setMatch(mediaQuery.matches);
    }
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMatch);
      return () => mediaQuery.removeEventListener('change', handleMatch);
    } else {
      // backwards compatibility
      // https://betterprogramming.pub/using-window-matchmedia-in-react-8116eada2588
      mediaQuery.addListener(handleMatch);
      return () => mediaQuery.removeListener(handleMatch);
    }
  }, [mediaQuery]);

  return match;
}
