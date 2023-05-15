import { useCallback, useEffect, useState } from 'react';

import { useFetchClient } from '@strapi/helper-plugin';

export const useDeletedEntries = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);

  const client = useFetchClient();

  const fetchDeletedEntries = useCallback(async () => {
    try {
      const models = await getModels(client);
      if (!models) throw new Error('No models found');

      const results = await Promise.all(
        models.map(async (model) => {
          const entries = await getDeletedEntries(client, { model });
          return { model, entries };
        }),
      );

      const combinedResults = results.flatMap(({ model, entries }) => {
        if (entries.length === 0) return [];
        return entries.map((entry: any) => ({
          ...entry,
          __type: model,
        }));
      });

      setEntries(combinedResults);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [client]);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(false);
    await fetchDeletedEntries();
  }, [fetchDeletedEntries]);

  useEffect(() => {
    fetchDeletedEntries();
  }, []);

  return { loading, error, refetch, entries };
};

/**
 * Helper functions
 */

const getModels = async (fetcher: any): Promise<string[] | undefined> => {
  const { data } = await fetcher.get('/soft-delete/models');
  return data?.models;
};

const getDeletedEntries = async (
  fetcher: any,
  { model }: { model: string },
) => {
  const { data } = await fetcher.get(
    `/content-manager/collection-types/api::${model}.${model}?filters[deleted][$eq]=true`,
  );

  return data?.results;
};
