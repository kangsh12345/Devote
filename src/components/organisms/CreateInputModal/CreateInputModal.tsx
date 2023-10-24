'use client';

import { Dispatch, SetStateAction } from 'react';

import { Input } from '../../atoms/Input';
import { Modal } from '../../moecules/Modal';

export interface CreateInputModalProps {
  modalType?: 'left' | 'right' | 'column' | 'row';
  withCloseButton?: boolean;
  title?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<string>>;
  handle: (type: 'rootFolder' | 'folder' | 'file') => void;
  inputLabel: string;
  placeholder: string;
  maxLength?: number;
  value: string;
}

export const CreateInputModal = ({
  modalType = 'right',
  withCloseButton = false,
  title = '',
  leftButtonText = '취소',
  rightButtonText = '생성',
  setOpen,
  setInput,
  handle,
  inputLabel,
  placeholder,
  maxLength = 15,
  value,
}: CreateInputModalProps) => {
  return (
    <Modal
      handle={() => handle('folder')}
      setInput={setInput}
      setOpen={setOpen}
      type={modalType}
      title={title}
      withCloseButton={withCloseButton}
      leftButtonText={leftButtonText}
      rightButtonText={rightButtonText}
    >
      <Input
        label={inputLabel}
        hideLabel
        placeholder={placeholder}
        maxLength={maxLength}
        variant="flushed"
        size="md"
        value={value}
        onChange={event => {
          setInput(event.target.value);
        }}
      />
    </Modal>
  );
};
