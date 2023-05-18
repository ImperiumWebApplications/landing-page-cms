import { useCallback } from 'react';

import { useFetchClient } from '@strapi/helper-plugin';

export const useRestoreEntry = () => {
  const client = useFetchClient();

  return useCallback(async (model?: string, id?: string) => {
    await client.put(
      `/content-manager/collection-types/api::${model}.${model}/${id}`,
      {
        deleted: false,
      },
    );
  }, []);
};
