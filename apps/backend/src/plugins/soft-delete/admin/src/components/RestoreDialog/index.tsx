import React, { useState } from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Flex,
  Typography,
  Loader,
} from '@strapi/design-system';
import { Check, Information } from '@strapi/icons';

import { Undo } from '../Icons';

export type EntryToRestore = {
  name: string;
  model: string;
  id: string;
} | null;

type RestoreDialogProps = {
  entry: EntryToRestore;
  onClose: () => void;
  onRestore: (model?: string, id?: string) => Promise<void>;
};

const RestoreDialog: React.FC<RestoreDialogProps> = (props) => {
  const { entry, onClose, onRestore } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleRestore = async () => {
    try {
      setLoading(true);
      await onRestore(entry?.model, entry?.id);
      setLoading(false);
      onClose();
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const getDialogIcon = () => {
    if (loading) return <Loader small />;
    if (error) return <Information color="grey" />;
    return <Undo color="grey" />;
  };

  const getDialogDescription = () => {
    if (loading) return 'Restoring entry...';
    if (error) return 'An error occurred while restoring this entry.';
    return 'Are you sure you want to restore this entry?';
  };

  return (
    <Dialog
      title={`Restore ${entry?.name}`}
      onClose={onClose}
      isOpen={entry !== null}
    >
      <DialogBody icon={getDialogIcon()}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              {getDialogDescription()}
            </Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={onClose} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            onClick={handleRestore}
            variant="default"
            startIcon={error ? null : <Check />}
            disabled={loading}
          >
            {error ? 'Try again' : 'Restore'}
          </Button>
        }
      />
    </Dialog>
  );
};

export default RestoreDialog;
