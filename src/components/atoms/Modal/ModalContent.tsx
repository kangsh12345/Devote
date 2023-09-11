import { PropsWithChildren } from 'react';

import { Box } from '../Box';
import { CloseButton } from '../Button';
import { Card } from '../Card';
import { ModalActions } from './ModalActions';
import * as styles from './modalContent.css';

export interface ModalContentProps {
  type?: 'left' | 'right' | 'column' | 'row';
  withCloseButton?: boolean;
  title?: string;
  leftButtonText: string;
  rightButtonText: string;
}

export const ModalContent = ({
  type = 'right',
  withCloseButton = false,
  title,
  leftButtonText,
  rightButtonText,
  children,
}: PropsWithChildren<ModalContentProps>) => {
  return (
    <Box width="fit" position="relative" className={styles.root}>
      <Card variant="elevated" type="modal">
        {withCloseButton && (
          <Box className={styles.closeButton}>
            <CloseButton />
          </Box>
        )}
        <Box
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
            <ModalActions
              type={type}
              leftButtonText={leftButtonText}
              rightButtonText={rightButtonText}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
