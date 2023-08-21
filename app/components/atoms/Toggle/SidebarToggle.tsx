'use client';

import { useState } from 'react';
import { CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './sidebarToggle.css';

export interface SidebarToggleProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  // isOpen: boolean;
  // handleOpen: () => void;
}

export const SidebarToggle = ({
  size = 'md',
  disabled = false, // isOpen, handleOpen,
}: SidebarToggleProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const iconSize = size === 'lg' ? 28 : size === 'md' ? 24 : 20;

  return (
    <Box
      className={styles.root({ size: size, disabled })}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <CaretDoubleLeft weight="duotone" size={iconSize} />
      ) : (
        <CaretDoubleRight weight="duotone" size={iconSize} />
      )}
    </Box>
  );
};
