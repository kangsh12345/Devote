'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react';

import { Box } from '../../atoms/Box';
import { IconButton } from '../../atoms/Button';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './subHeader.css';

export interface SubHeaderProps {
  text?: string;
}

export const SubHeader = ({ text = '' }: SubHeaderProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={styles.root}>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={styles.box({})}>
        <Box className={styles.breakpoint({ type: 'side' })}>
          <HeaderLogo isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
        <Box display="flex" gap="3" alignItems="center">
          <Box onClick={() => router.back()}>
            <IconButton
              size="lg"
              icon={<ArrowLeft size={24} weight="bold" />}
            />
          </Box>
          <Box fontSize="3" fontWeight={700}>
            {text}
          </Box>
        </Box>
      </Box>
      <Box marginTop="-2" className={styles.switcher()}>
        <ThemeSwitcher size="md" />
      </Box>
    </Box>
  );
};
