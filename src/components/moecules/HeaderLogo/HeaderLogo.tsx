import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

import { Box } from '../../atoms/Box';
import { Logo } from '../../atoms/Logo';
import { SidebarToggle } from '../../atoms/Toggle/SidebarToggle';
import * as styles from './headerLogo.css';

export interface SidebarToggleProps {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const HeaderLogo = ({
  size = 'md',
  disabled = false,
  isOpen,
  setIsOpen,
}: SidebarToggleProps) => {
  return (
    <Box className={styles.root({})}>
      <SidebarToggle
        size={size}
        disabled={disabled}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="header"
      />
      <Link href="/">
        <Logo size="md" />
      </Link>
    </Box>
  );
};
