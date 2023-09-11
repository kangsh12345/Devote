import { Mode } from '@/src/tokens';
import { parseCookies, setCookie } from 'nookies';

export const modeKey = 'mode';

export const setThemeMode = (mode: string) =>
  setCookie({}, modeKey, mode, {
    path: '/',
  });

export const getThemeMode = (): Mode | undefined =>
  parseCookies({})?.[modeKey] as Mode | undefined;
