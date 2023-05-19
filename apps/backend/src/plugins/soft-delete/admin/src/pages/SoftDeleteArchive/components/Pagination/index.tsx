import React from 'react';

import { Box, Flex, Typography } from '@strapi/design-system';
import { PaginationURLQuery, PageSizeURLQuery } from '@strapi/helper-plugin';

type PaginationProps = {
  count: string;
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export const Pagination: React.FC<PaginationProps> = ({
  count,
  pagination,
}) => {
  if (!pagination) return null;

  return (
    <Box paddingBottom={6} paddingLeft={10} paddingRight={10}>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <PageSizeURLQuery />
        <Typography textColor="neutral600">{count}</Typography>
        <PaginationURLQuery pagination={pagination} />
      </Flex>
    </Box>
  );
};
