'use client';

import { useCallback } from 'react';
import { setThemeMode } from '@/utils/cookies';
import { useIsMounted } from '@/utils/isMounted';

import { useTheme } from '../ThemeProvider';

export const ThemeSwitcher = () => {
  const isMounted = useIsMounted();
  const { mode, setMode } = useTheme();

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
    setThemeMode(nextMode);
  }, [mode, setMode]);

  return (
    <div
      style={{ backgroundColor: '#ffe2e2', height: 100, width: 100 }}
      onClick={toggleMode}
    >
      {isMounted ? mode : 'light'}
    </div>
  );
};
