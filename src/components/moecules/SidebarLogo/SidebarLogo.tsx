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
  type?: 'sidebar' | 'drawer';
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const SidebarLogo = ({
  size = 'md',
  disabled = false,
  isOpen,
  type = 'sidebar',
  setIsOpen,
}: SidebarToggleProps) => {
  return (
    <Box className={styles.root({ isOpen, type })}>
      <Box position="absolute" left="4">
        <SidebarToggle
          size={size}
          disabled={disabled}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Box>
      {type === 'drawer' || (type === 'sidebar' && isOpen) ? (
        <Link href="/">
          <Logo />
        </Link>
      ) : (
        <Box width="8" height="8" />
      )}
    </Box>
  );
};
