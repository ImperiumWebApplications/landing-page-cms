import { useHistory, useLocation } from 'react-router-dom';

export type Pagination = {
  pageSize: number;
  page: number;
};

export const usePagination = () => {
  try {
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const pageSize = params.get('pageSize') ?? '10';
    const page = params.get('page') ?? '1';

    const setPagination = (pagination: Pagination) => {
      Object.entries(pagination).forEach(([key, value]) => {
        params.set(key, value.toString());
      });
      history.push({ search: params.toString() });
    };

    return {
      setPagination,
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
    };
  } catch {
    return { page: undefined, pageSize: undefined };
  }
};
