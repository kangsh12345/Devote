'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Mode } from '@/app/tokens';

export const themeKey = 'theme';

interface DarkModeContextValues {
  darkMode: Mode | null;
  setDarkMode: (darkMode: Mode) => void;
}

export const DarkModeContext = createContext<DarkModeContextValues>({
  darkMode: null,
  setDarkMode: () => {},
});

export function DarkModeProvider({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState<Mode | null>(null);

  useEffect(() => {
    setDarkMode(
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
  }, []);

  const setter = (m: Mode) => {
    setDarkMode(m);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(m);

    try {
      localStorage.setItem(themeKey, m);
    } catch (e) {}
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode: setter }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div
      style={{ background: '#ffe2e2', width: 100, height: 100 }}
      onClick={() => setDarkMode(darkMode === 'light' ? 'dark' : 'light')}
    />
  );
};
