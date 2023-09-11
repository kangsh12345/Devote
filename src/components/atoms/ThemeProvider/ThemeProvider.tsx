'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getModeColors } from '@/src/css';
import { Mode } from '@/src/tokens';
import { setElementVars } from '@vanilla-extract/dynamic';

type ThemeContextValue = {
  forcedMode?: Mode;
  mode: Mode;
  setMode(mode: Mode): void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const themeModeAttribute = 'data-theme';

export type ThemeProviderProps = {
  defaultMode?: Mode;
  element?: string | HTMLElement;
  forcedMode?: Mode;
};

export const ThemeProvider = ({
  children,
  defaultMode = 'light',
  element = ':root',
  forcedMode,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const value = useMemo(
    () => ({
      forcedMode,
      mode: mode,
      setMode,
    }),
    [forcedMode, mode],
  );

  const resolvedMode = forcedMode ?? mode;
  useEffect(() => {
    const root = getElement(element);
    if (root) {
      const enable = disableAnimation();
      root.setAttribute(themeModeAttribute, resolvedMode);
      setElementVars(root as HTMLElement, getModeColors(mode));
      enable();
    }
  }, [element, resolvedMode, mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('Must be used within ThemeProvider');
  return context;
};

const getElement = (selector: string | HTMLElement = ':root') => {
  if (typeof selector === 'string') return document.querySelector(selector);
  return selector;
};

const disableAnimation = () => {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1);
  };
};
