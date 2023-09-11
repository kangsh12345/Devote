import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'textPrimary',
      borderRadius: 'md',
      backgroundColor: {
        base: 'backgroundBase',
        hover: 'backgroundSurfaceBasePressed',
      },
      flexShrink: 0,
    }),
  ],
  variants: {
    size: {
      lg: atoms({
        width: '9',
        height: '9',
      }),
      md: atoms({
        width: '8',
        height: '8',
      }),
      sm: atoms({
        width: '7',
        height: '7',
      }),
    },
    disabled: {
      true: [
        atoms({
          cursor: 'not-allowed',
        }),
        style({
          opacity: 0.5,
        }),
      ],
      false: {},
    },
  },
});
