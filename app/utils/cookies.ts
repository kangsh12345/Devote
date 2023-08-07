import { parseCookies, setCookie } from 'nookies';

import { Mode } from '../tokens';

export const modeKey = 'mode';

export const setThemeMode = (mode: string) =>
  setCookie({}, modeKey, mode, {
    path: '/',
  });

export const getThemeMode = (): Mode | undefined =>
  parseCookies({})?.[modeKey] as Mode | undefined;
