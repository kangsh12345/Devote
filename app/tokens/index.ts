import { breakpoints } from './breakpoint';
import { colors } from './color';
import { radii } from './radii';
import { shadows } from './shadows';
import { space } from './space';
import {
  fontFamilies,
  fontSize,
  fontWeights,
  letterSpacing,
  lineHeights,
  paragraphIndent,
  paragraphSpacing,
  textCase,
  textDecoration,
  typographies,
} from './typography';

export const tokens = {
  breakpoints,
  colors,
  radii,
  shadows,
  space,
  fontFamilies,
  fontSize,
  fontWeights,
  letterSpacing,
  lineHeights,
  paragraphIndent,
  paragraphSpacing,
  textCase,
  textDecoration,
  typographies,
};

export type Tokens = typeof tokens;
