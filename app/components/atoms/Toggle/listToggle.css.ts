import { atoms, vars } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      borderRadius: 'md',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    }),
  ],
  variants: {
    size: {
      sm: atoms({ width: '7', height: '7' }),
      md: atoms({ width: '8', height: '8' }),
      lg: atoms({ width: '9', height: '9' }),
    },
    color: {
      primary: {},
      secondary: {},
    },
    isActive: {
      true: {},
      false: atoms({
        backgroundColor: {
          hover: 'opacityBlack100',
        },
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        color: 'primary',
        isActive: true,
      },
      style: [
        atoms({
          backgroundColor: {
            base: 'opacityBlack100',
            hover: 'opacityBlack200',
          },
        }),
      ],
    },
    {
      variants: {
        color: 'secondary',
        isActive: true,
      },
      style: [
        atoms({
          backgroundColor: {
            base: 'opacityBlack200',
            hover: 'opacityBlack300',
          },
        }),
      ],
    },
  ],
});

export const IconWrapper = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  ],
  variants: {
    size: {
      sm: atoms({ width: '5', height: '5' }),
      md: atoms({ width: '6', height: '6' }),
      lg: atoms({ width: '7', height: '7' }),
    },
    isActive: {
      true: style({
        filter: vars.colors.filterTextPrimary,
      }),
      false: style({
        filter: vars.colors.filterTextSecondary,
      }),
    },
  },
});
