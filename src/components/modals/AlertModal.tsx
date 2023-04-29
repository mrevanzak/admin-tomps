import { Modal } from '@mantine/core';
import React from 'react';

import Button from '../buttons/Button';

type AlertModalProps = {
  opened: boolean;
  close: () => void;
  onDelete: () => void;
  isLoading?: boolean;
};

export default function AlertModal({
  opened,
  close,
  onDelete,
  isLoading,
}: AlertModalProps) {
  return (
    <Modal opened={opened} onClose={close} title='Delete' centered>
      <p>Are you sure want to delete this data?</p>
      <div className='mt-4 flex justify-center space-x-2'>
        <Button variant='outline' onClick={close}>
          Cancel
        </Button>
        <Button variant='danger' onClick={onDelete} isLoading={isLoading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
