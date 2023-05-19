import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  BaseHeaderLayout,
  EmptyStateLayout,
  Button,
} from '@strapi/design-system';
import { Eye, Refresh } from '@strapi/icons';

import RestoreDialog, { EntryToRestore } from '../../components/RestoreDialog';
import { getReadonlyViewURL } from '../../components/ReadonlyView';
import { Undo } from '../../components/Icons';

import { useDeletedEntries } from '../../hooks/useDeletedEntries';
import { useRestoreEntry } from '../../hooks/useRestoreEntry';
import { usePagination } from '../../hooks/usePagination';
import { useModelParam } from '../../hooks/useModelParam';

import TableView from './components/TableView';
import { ModelSelect } from './components/ModelSelect';
import { Pagination } from './components/Pagination';

const SoftDeleteArchive = () => {
  const [selectedEntry, setSelectedEntry] = useState<EntryToRestore>(null);

  const history = useHistory();
  const restoreEntry = useRestoreEntry();
  const { page, pageSize } = usePagination();
  const { model, setModel } = useModelParam();

  const { entries, models, loading, error, refetch, total, pageCount } =
    useDeletedEntries();

  const memoizedPagination = useMemo(() => {
    return {
      page: page ?? 1,
      pageSize: pageSize ?? 10,
      total: total ?? 0,
      pageCount: pageCount ?? 0,
    };
  }, [page, pageSize, total, pageCount]);

  const handleRestore = useCallback(
    async (model?: string, id?: string) => {
      await restoreEntry(model, id);
      await refetch();
      setSelectedEntry(null);
    },
    [restoreEntry, refetch],
  );

  const getEntryCount = useCallback(() => {
    if (loading) return 'Loading...';
    if (error) return 'Error loading entries';
    if (total === 0) return 'No entries';
    if (total === 1) return '1 entry';
    return `${total} entries`;
  }, [loading, error, total]);

  return (
    <>
      <div>
        <Box background="neutral100">
          <BaseHeaderLayout title="Trash" as="h1" />
        </Box>
        <ModelSelect models={models} value={model} onChange={setModel} />
        {loading ||
          (entries.length === 0 && (
            <Box padding={8} background="neutral100">
              <EmptyStateLayout content="There are no deleted entries yet." />
            </Box>
          ))}
        {error && (
          <Box padding={8} background="neutral100">
            <EmptyStateLayout
              content="There was an error loading entries."
              action={
                <Button
                  variant="secondary"
                  startIcon={<Refresh />}
                  onClick={refetch}
                >
                  Reload
                </Button>
              }
            />
          </Box>
        )}
        {!loading && !error && entries.length > 0 && (
          <>
            <TableView
              entries={entries}
              style={{
                marginTop: '-30px',
                paddingLeft: '56px',
                paddingRight: '56px',
              }}
              actions={[
                {
                  label: 'View',
                  icon: <Eye />,
                  onClick: (entry) => {
                    const url = getReadonlyViewURL(entry.__type, entry.id);
                    history.push(url);
                  },
                },
                {
                  label: 'Restore',
                  icon: <Undo />,
                  onClick: (entry) => {
                    setSelectedEntry({
                      name: entry.brand_name || entry.name,
                      model: entry.__type,
                      id: entry.id,
                    });
                  },
                },
              ]}
            />
            <Pagination
              pagination={memoizedPagination}
              count={getEntryCount()}
            />
          </>
        )}
      </div>
      <RestoreDialog
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onRestore={handleRestore}
      />
    </>
  );
};

export default SoftDeleteArchive;
