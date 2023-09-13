import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

import { Box } from '../../atoms/Box';
import { Logo } from '../../atoms/Logo';
import { SidebarToggle } from '../../atoms/Toggle/SidebarToggle';
import * as styles from './sidebarLogo.css';

export interface SidebarToggleProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const SidebarLogo = ({
  size = 'md',
  disabled = false,
  isOpen,
  setIsOpen,
}: SidebarToggleProps) => {
  return (
    <Box className={styles.root({ isOpen })}>
      {/* 추후 atoms 로 묶어서 작업 */}
      {isOpen && (
        <Link href="/">
          <Logo />
        </Link>
      )}
      <SidebarToggle
        size={size}
        disabled={disabled}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Box>
  );
};
