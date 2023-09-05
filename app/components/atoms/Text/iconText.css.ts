import { atoms, vars } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 500,
      lineHeight: 0,
      color: 'textPrimary',
    }),
  ],
  variants: {
    size: {
      xl: atoms({
        fontSize: '3',
        height: '7',
      }),
      lg: atoms({ fontSize: '2' }),
      md: atoms({ fontSize: '1' }),
      sm: atoms({ fontSize: '0' }),
    },
  },
});

export const iconWrapper = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    style({ filter: vars.colors.filterTextPrimary }),
  ],
  variants: {
    size: {
      xl: atoms({ height: '7', width: '7' }),
      lg: atoms({ height: '6', width: '6' }),
      md: atoms({ height: '5', width: '5' }),
      sm: atoms({ height: '4', width: '4' }),
    },
  },
});
