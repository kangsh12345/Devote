import { StyleRule } from '@vanilla-extract/css';
import { CSSVarFunction } from '@vanilla-extract/private';

import { Mode, tokens } from '../tokens';

export const getVarName = (_value: string | null, path: string[]) =>
  path.join('-').replace('.', '_').replace('/', '__');

export const motionSafe = (style: StyleRule) => ({
  '@media': {
    '(prefers-reduced-motion: no-preference)': style,
  },
});

export const rgb = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`;

export const getModeColors = (mode: Mode) => tokens.colors[mode];
