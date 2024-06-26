'use client';

import { Dispatch, MouseEvent, SetStateAction } from 'react';

import { Input } from '../../atoms/Input';
import { InputModal } from '../../moecules/Modal';

export interface CreateInputModalProps {
  modalType?: 'left' | 'right' | 'column' | 'row';
  withCloseButton?: boolean;
  title?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: (value: string) => void;
  handle: (event: MouseEvent<HTMLButtonElement>) => void;
  inputLabel: string;
  placeholder: string;
  maxLength?: number;
  value: string;
  inputError: string;
  setInputError: Dispatch<SetStateAction<string>>;
  clearInput?: boolean;
  loading?: boolean;
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
  maxLength = 24,
  value,
  inputError,
  setInputError,
  clearInput = true,
  loading = false,
}: CreateInputModalProps) => {
  const specialRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  const doublespaceRegex = /\s\s+/g;

  return (
    <InputModal
      handle={handle}
      setInput={setInput}
      setInputError={setInputError}
      setOpen={setOpen}
      type={modalType}
      title={title}
      withCloseButton={withCloseButton}
      leftButtonText={leftButtonText}
      rightButtonText={rightButtonText}
      clearInput={clearInput}
      loading={loading}
    >
      <Input
        label={inputLabel}
        error={inputError}
        hideLabel
        placeholder={placeholder}
        maxLength={maxLength}
        variant="flushed"
        size="md"
        value={value}
        onChange={event => {
          setInput(
            event.target.value
              .replace(doublespaceRegex, ' ')
              .replace(specialRegex, ''),
          );
          if (inputError !== '') {
            setInputError('');
          }
        }}
      />
    </InputModal>
  );
};
