import { useCallback, useEffect, useState } from 'react';

import { useFetchClient } from '@strapi/helper-plugin';

import { useModelParam } from './useModelParam';
import { usePagination } from './usePagination';

export const useDeletedEntries = () => {
  const { page, pageSize, setPagination } = usePagination();
  const { model: modelParam, setModel } = useModelParam();

  const [models, setModels] = useState<string[]>();
  const [total, setTotal] = useState<number>();
  const [pageCount, setPageCount] = useState<number>();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const client = useFetchClient();

  const fetchDeletedEntries = useCallback(async () => {
    try {
      const models = await getModels(client);
      if (!models) throw new Error('No models found');

      const model = modelParam ?? models[0];
      const { results, pagination } = await getDeletedEntries(client, {
        model,
        page,
        pageSize,
      });

      setEntries(results.map((entry: any) => ({ ...entry, __type: model })));
      setTotal(pagination.total);
      setPageCount(pagination.pageCount);
      setModels(models);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [client, modelParam, page, pageSize]);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(false);
    await fetchDeletedEntries();
  }, [fetchDeletedEntries]);

  useEffect(() => {
    fetchDeletedEntries();
  }, [modelParam, page, pageSize]);

  useEffect(() => {
    if (!modelParam && !!models?.length) setModel(models[0]);
  }, [models]);

  useEffect(() => {
    setPagination?.({ page: 1, pageSize: 10 });
  }, [modelParam]);

  return { loading, error, refetch, entries, models, total, pageCount };
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
  {
    model,
    page,
    pageSize,
  }: { model: string; page?: number; pageSize?: number },
) => {
  const pageParam = page ? `&page=${page}` : '';
  const pageSizeParam = pageSize ? `&pageSize=${pageSize}` : '';

  const { data } = await fetcher.get(
    `/content-manager/collection-types/api::${model}.${model}?filters[deleted][$eq]=true&${pageParam}${pageSizeParam}`,
  );

  return data;
};
