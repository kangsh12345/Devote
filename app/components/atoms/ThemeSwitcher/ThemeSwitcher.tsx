'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { setThemeMode } from '@/app/utils/cookies';

import { Box } from '../Box';
import { useTheme } from '../ThemeProvider';
import * as styles from './themeSwitcher.css';

export interface ThemeSwitcherProps {
  size: 'lg' | 'md' | 'sm';
}

export const ThemeSwitcher = ({ size = 'md' }: ThemeSwitcherProps) => {
  const { mode, setMode } = useTheme();

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
    setThemeMode(nextMode);
  }, [mode, setMode]);

  const sizes =
    size === 'lg'
      ? { width: 10, height: 45, src: '/image/DarkSwitcher1.svg' }
      : size === 'md'
      ? { width: 8, height: 41, src: '/image/DarkSwitcher2.svg' }
      : { width: 6, height: 37, src: '/image/DarkSwitcher3.svg' };

  return (
    // TODO: hover시 아래로 살짝 내려오는 애니메이션
    <Box
      onClick={toggleMode}
      width="min"
      className={styles.switcher}
      padding="1.5"
    >
      <Image
        src={sizes.src}
        alt="darkswitcher_logo"
        width={sizes.width}
        height={sizes.height}
      />
    </Box>
  );
};
