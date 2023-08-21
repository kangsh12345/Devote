import { X } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './closeButton.css';

export interface CloseButtonProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  disabled?: boolean;
}

export const CloseButton = ({
  size = 'md',
  disabled = false,
}: CloseButtonProps) => {
  const iconSize =
    size === 'xl' ? 24 : size === 'lg' ? 18 : size === 'md' ? 14 : 12;
  return (
    <Box className={styles.root({ size: size, disabled })}>
      <X weight="bold" size={iconSize} />
    </Box>
  );
};
