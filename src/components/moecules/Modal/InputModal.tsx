import { Dispatch, MouseEvent, PropsWithChildren, SetStateAction } from 'react';

import { Box } from '../../atoms/Box';
import { InputModalContent, InputModalOverlay } from '../../atoms/Modal';
import { Portal } from '../../atoms/Portal';

export interface InputModalProps {
  type?: 'left' | 'right' | 'column' | 'row';
  withCloseButton?: boolean;
  title?: string;
  leftButtonText: string;
  rightButtonText: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<string>>;
  setInputError: Dispatch<SetStateAction<string>>;
  handle: (event: MouseEvent<HTMLButtonElement>) => void;
  clearInput: boolean;
}

export const InputModal = ({
  type = 'right',
  withCloseButton = false,
  title,
  leftButtonText,
  rightButtonText,
  setOpen,
  setInput,
  setInputError,
  handle,
  children,
  clearInput,
}: PropsWithChildren<InputModalProps>) => {
  return (
    <Portal selector="#portal">
      <Box
        position="absolute"
        width="viewWidth"
        height="viewHeight"
        top="0"
        left="0"
        bottom="0"
        right="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom="48"
        zIndex="100"
      >
        <InputModalOverlay
          visible
          setOpen={setOpen}
          setInput={setInput}
          setInputError={setInputError}
        />
        <InputModalContent
          setOpen={setOpen}
          setInput={setInput}
          setInputError={setInputError}
          handle={handle}
          type={type}
          withCloseButton={withCloseButton}
          title={title}
          leftButtonText={leftButtonText}
          rightButtonText={rightButtonText}
          clearInput={clearInput}
        >
          {children}
        </InputModalContent>
      </Box>
    </Portal>
  );
};
