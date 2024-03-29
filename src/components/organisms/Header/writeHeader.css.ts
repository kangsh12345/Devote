import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = atoms({
  position: 'relative',
  color: 'textPrimary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '16',
  backgroundColor: 'backgroundElevatedSecondary',
  borderBottomWidth: 'px',
  borderColor: 'borderPrimary',
  paddingLeft: { wide: '4', tablet: '19.5' },
  paddingRight: { wide: '12', tablet: '19.5' },
});

export const box = atoms({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'full',
});

export const switcher = atoms({
  position: 'absolute',
  right: { wide: '4', tablet: '8' },
  top: '0',
});

export const breakpoint = recipe({
  base: [],
  variants: {
    type: {
      header: atoms({ display: { wide: 'none', tablet: 'flex' } }),
      side: atoms({ display: { wide: 'flex', tablet: 'none' } }),
    },
  },
});

export const ellipsis = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
});
