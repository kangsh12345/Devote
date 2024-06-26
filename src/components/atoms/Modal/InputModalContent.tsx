import { Dispatch, MouseEvent, PropsWithChildren, SetStateAction } from 'react';

import { Box } from '../Box';
import { CloseButton } from '../Button';
import { Card } from '../Card';
import { InputModalActions } from './InputModalActions';
import * as styles from './modalContent.css';

export interface InputModalContentProps {
  type?: 'left' | 'right' | 'column' | 'row';
  withCloseButton?: boolean;
  title?: string;
  leftButtonText: string;
  rightButtonText: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: (value: string) => void;
  setInputError: Dispatch<SetStateAction<string>>;
  handle: (event: MouseEvent<HTMLButtonElement>) => void;
  clearInput: boolean;
  loading?: boolean;
}

export const InputModalContent = ({
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
  loading = false,
}: PropsWithChildren<InputModalContentProps>) => {
  return (
    <Box width="106" position="fixed" className={styles.root}>
      <Card variant="elevated" type="modal">
        {withCloseButton && (
          <Box className={styles.closeButton}>
            <CloseButton />
          </Box>
        )}
        <Box
          width="full"
          paddingX="3"
          paddingY="2"
          borderRadius="lg"
          backgroundColor="backgroundSurfaceElevatedPrimaryDefault"
        >
          {title ? (
            <Box className={styles.header}>{title}</Box>
          ) : withCloseButton ? (
            <Box height="9" />
          ) : (
            <Box height="4" />
          )}
          <Box className={styles.content}>{children}</Box>
          <Box className={styles.footer({ type })}>
            <InputModalActions
              setOpen={setOpen}
              setInput={setInput}
              setInputError={setInputError}
              handle={handle}
              type={type}
              leftButtonText={leftButtonText}
              rightButtonText={rightButtonText}
              clearInput={clearInput}
              loading={loading}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
