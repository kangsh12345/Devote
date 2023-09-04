'use client';

import { Dispatch, SetStateAction } from 'react';
import { CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './sidebarToggle.css';

export interface SidebarToggleProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const SidebarToggle = ({
  size = 'md',
  disabled = false,
  isOpen,
  setIsOpen,
}: SidebarToggleProps) => {
  const iconSize = size === 'lg' ? 28 : size === 'md' ? 24 : 20;

  return (
    <Box
      className={styles.root({ size: size, disabled })}
      onClick={() =>
        isOpen ? setIsOpen && setIsOpen(false) : setIsOpen && setIsOpen(true)
      }
    >
      {isOpen ? (
        <CaretDoubleLeft weight="duotone" size={iconSize} />
      ) : (
        <CaretDoubleRight weight="duotone" size={iconSize} />
      )}
    </Box>
  );
};
