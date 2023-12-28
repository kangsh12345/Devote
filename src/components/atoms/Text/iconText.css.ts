import { atoms, vars } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
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
      cardhover: atoms({ color: 'textHoverWhite' }),
    },
    isActive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { type: 'sidebarnav', isActive: true },
      style: atoms({ color: 'textPrimary' }),
    },
    {
      variants: { type: 'sidebarnav', isActive: false },
      style: atoms({ color: 'textSecondary' }),
    },
  ],
});

export const iconWrapper = recipe({
  base: [atoms({ position: 'relative' })],
  variants: {
    size: {
      xl: atoms({ height: '7', width: '7' }),
      lg: atoms({ height: '6', width: '6' }),
      md: atoms({ height: '5', width: '5' }),
      sm: atoms({ height: '4', width: '4' }),
    },
    type: {
      normal: style({ filter: vars.colors.filterTextPrimary }),
      sidebarnav: {},
      cardhover: style({ filter: vars.colors.filterOrangeSecondary }),
    },
    isActive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        type: 'sidebarnav',
        isActive: true,
      },
      style: style({
        filter: vars.colors.filterTextPrimary,
      }),
    },
    {
      variants: {
        type: 'sidebarnav',
        isActive: false,
      },
      style: style({
        filter: vars.colors.filterTextSecondary,
      }),
    },
  ],
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
