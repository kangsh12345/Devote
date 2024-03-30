import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { Box } from '../../atoms/Box';
import { ModalContent, ModalOverlay } from '../../atoms/Modal';
import { Portal } from '../../atoms/Portal';

export interface ModalProps {
  type?: 'left' | 'right' | 'column' | 'row';
  withCloseButton?: boolean;
  title?: string;
  leftButtonText: string;
  rightButtonText: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handle: () => void;
  loading?: boolean;
}

export const Modal = ({
  type = 'right',
  withCloseButton = false,
  title,
  leftButtonText,
  rightButtonText,
  setOpen,
  handle,
  children,
  loading = false,
}: PropsWithChildren<ModalProps>) => {
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
        <ModalOverlay visible setOpen={setOpen} />
        <ModalContent
          setOpen={setOpen}
          handle={handle}
          type={type}
          withCloseButton={withCloseButton}
          title={title}
          leftButtonText={leftButtonText}
          rightButtonText={rightButtonText}
          loading={loading}
        >
          {children}
        </ModalContent>
      </Box>
    </Portal>
  );
};
