import React, { useCallback, useState } from 'react';
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

import TableView from './components/TableView';

const SoftDeleteArchive = () => {
  const [selectedEntry, setSelectedEntry] = useState<EntryToRestore>(null);

  const history = useHistory();
  const restoreEntry = useRestoreEntry();
  const { entries, loading, error, refetch } = useDeletedEntries();

  const handleRestore = useCallback(
    async (model?: string, id?: string) => {
      await restoreEntry(model, id);
      await refetch();
      setSelectedEntry(null);
    },
    [restoreEntry, refetch],
  );

  const getHeaderSubtitle = useCallback(() => {
    if (loading) return 'Loading...';
    if (error) return 'Error loading entries';
    if (entries.length === 0) return 'No entries';
    if (entries.length === 1) return '1 entry';
    return `${entries.length} entries`;
  }, [loading, error, entries]);

  return (
    <>
      <div>
        <Box background="neutral100">
          <BaseHeaderLayout
            title="Trash"
            subtitle={getHeaderSubtitle()}
            as="h1"
          />
        </Box>
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
          <TableView
            entries={entries}
            style={{ marginTop: '-20px' }}
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
                    name: entry.brand_name,
                    model: entry.__type,
                    id: entry.id,
                  });
                },
              },
            ]}
          />
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
