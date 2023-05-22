import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useQueryParam = (key: string, value: string) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query[key] !== value) {
      const query = { ...router.query, [key]: value };
      router.replace({ pathname: router.pathname, query });
    }
  }, [router, key, value]);
};
