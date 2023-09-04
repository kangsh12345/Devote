'use client';

import { useState } from 'react';

import { Box } from '../../atoms/Box';
import { Logo } from '../../atoms/Logo';
import { SidebarToggle } from '../../atoms/Toggle/SidebarToggle';
import * as styles from './sidebarLogo.css';

export interface SidebarToggleProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  // TODO: 추후 변경
  // isOpen: boolean;
  // setIsOpen?: (isOpen: boolean) => void;
}

export const SidebarLogo = ({
  size = 'md',
  disabled = false, // isOpen,handleOpen,
}: SidebarToggleProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box className={styles.root}>
      {/* 추후 atoms 로 묶어서 작업 */}
      {isOpen && <Logo />}
      <SidebarToggle
        size={size}
        disabled={disabled}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Box>
  );
};
