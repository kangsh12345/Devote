import { atoms, vars } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 500,
    }),
  ],
  variants: {
    size: {
      xl: atoms({ fontSize: '3' }),
      lg: atoms({ fontSize: '2' }),
      md: atoms({ fontSize: '1' }),
      sm: atoms({ fontSize: '0' }),
    },
    type: {
      normal: atoms({ color: 'textPrimary' }),
      sidebarnav: {},
    },
    isActive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { type: 'sidebarnav', isActive: false },
      style: atoms({ color: 'textSecondary' }),
    },
  ],
});

export const iconWrapper = recipe({
  base: [],
  variants: {
    size: {
      xl: atoms({ height: '7', width: '7' }),
      lg: atoms({ height: '6', width: '6' }),
      md: atoms({ height: '5', width: '5' }),
      sm: atoms({ height: '4', width: '4' }),
    },
    isActive: {
      true: style({ filter: vars.colors.filterTextPrimary }),
      false: style({ filter: vars.colors.filterTextSecondary }),
    },
  },
});

export const textWrapper = recipe({
  base: [],
  variants: {
    size: {
      xl: atoms({}),
      lg: atoms({}),
      md: atoms({ lineHeight: 0 }),
      sm: atoms({ lineHeight: 0 }),
    },
  },
});
