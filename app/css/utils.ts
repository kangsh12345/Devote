import { StyleRule } from '@vanilla-extract/css';
import { CSSVarFunction } from '@vanilla-extract/private';

export const getVarName = (_value: string | null, path: string[]) =>
  path.join('-').replace('.', '_').replace('/', '__');

export const motionSafe = (style: StyleRule) => ({
  '@media': {
    '(prefers-reduced-motion: no-preference)': style,
  },
});

export const rgb = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`;
