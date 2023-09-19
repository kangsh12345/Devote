'use client';

import { X } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './closeButton.css';

export interface CloseButtonProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
}

export const CloseButton = ({
  size = 'md',
  disabled = false,
}: CloseButtonProps) => {
  const iconSize = size === 'lg' ? 24 : size === 'md' ? 20 : 16;

  return (
    <Box className={styles.root({ size: size, disabled })}>
      <X weight="bold" size={iconSize} />
    </Box>
  );
};
