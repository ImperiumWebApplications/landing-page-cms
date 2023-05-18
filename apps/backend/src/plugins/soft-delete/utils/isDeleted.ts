export const isDeletedTrueFilter = (event: any) => {
  const filters = event.params.where?.$and;
  if (!filters?.length) return false;

  return filters.some((filter: any) => {
    return filter.deleted?.$eq === 'true';
  });
};

export const DELETED_SEARCH_PARAM = 'deleted';
export const isDeletedTrueSearch = (search: string) => {
  const params = new URLSearchParams(search);
  const deleted = params.get(DELETED_SEARCH_PARAM);

  return deleted === 'true';
};

export const RESTORED_SEARCH_PARAM = 'restored';
export const isRestoredTrueSearch = (search: string) => {
  const params = new URLSearchParams(search);
  const restored = params.get(RESTORED_SEARCH_PARAM);

  return restored === 'true';
};
