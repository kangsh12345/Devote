import { borderStyles, borderWidths } from './border';
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
  borderStyles,
  borderWidths,
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

export type { Mode } from './color';
export type Tokens = typeof tokens;
