'use client';

import { Dispatch, SetStateAction } from 'react';
import { List } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './sidebarToggle.css';

export interface SidebarToggleProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  type?: 'header' | 'side';
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const SidebarToggle = ({
  size = 'md',
  disabled = false,
  isOpen,
  type = 'side',
  setIsOpen,
}: SidebarToggleProps) => {
  const iconSize = size === 'lg' ? 28 : size === 'md' ? 24 : 20;

  return (
    <Box
      className={styles.root({ size: size, disabled, type })}
      onClick={() =>
        isOpen ? setIsOpen && setIsOpen(false) : setIsOpen && setIsOpen(true)
      }
    >
      <List weight="light" size={iconSize} />
    </Box>
  );
};
