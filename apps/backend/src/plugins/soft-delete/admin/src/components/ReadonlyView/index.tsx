import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Status, Typography, Button } from '@strapi/design-system';

import RestoreDialog, { EntryToRestore } from '../RestoreDialog';
import { useRestoreEntry } from '../../hooks/useRestoreEntry';
import {
  DELETED_SEARCH_PARAM,
  isDeletedTrueSearch,
} from '../../../../utils/isDeleted';

import { ReadonlyViewInjectedCSS } from './injectedCSS';

const ReadonlyView = () => {
  const dataManager = useCMEditViewDataManager();
  const entryData = getEntryDataFromDataManager(dataManager);
  const [selectedEntry, setSelectedEntry] = useState<EntryToRestore>(null);

  const history = useHistory();
  const location = useLocation();
  const restoreEntry = useRestoreEntry();

  const handleRestore = useCallback(
    async (model?: string, id?: string) => {
      await restoreEntry(model, id);
      setSelectedEntry(null);
      history.push(location.pathname);
    },
    [restoreEntry, history, location.pathname],
  );

  const isDeletedEntry = !!dataManager.initialData.deleted;
  const isDeletedSearch = isDeletedTrueSearch(location.search);

  if (!isDeletedSearch && isDeletedEntry) {
    history.push({ search: `${DELETED_SEARCH_PARAM}=true` });
    return null;
  }

  if (!isDeletedSearch) return null;

  return (
    <>
      <Status showBullet={false}>
        <Typography fontWeight="bold">This entry was deleted.</Typography>
      </Status>
      {entryData && (
        <Button
          id="restore-button"
          variant="primary"
          size="L"
          onClick={() => setSelectedEntry(entryData)}
        >
          Restore entry
        </Button>
      )}
      {selectedEntry && (
        <RestoreDialog
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onRestore={handleRestore}
        />
      )}
      <ReadonlyViewInjectedCSS />
    </>
  );
};

export default ReadonlyView;

/** Helper functions */

export const getReadonlyViewURL = (model: string, id: string) => {
  return `/content-manager/collectionType/api::${model}.${model}/${id}?${DELETED_SEARCH_PARAM}=true`;
};

const getEntryDataFromDataManager = (dataManager: any) => {
  const id = dataManager.initialData.id;
  const name = dataManager.initialData.brand_name;
  const model = dataManager.layout.apiID;
  if (!id || !name || !model) return null;

  return { id, name, model };
};
