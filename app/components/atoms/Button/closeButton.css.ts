import { atoms } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      paddingTop: 'px',
      color: 'textPrimary',
      borderRadius: 'md',
      backgroundColor: 'backgroundBase',
    }),
  ],
  variants: {
    size: {
      xl: atoms({
        width: '12',
        height: '12',
      }),
      lg: atoms({
        width: '10',
        height: '10',
      }),
      md: atoms({
        width: '8',
        height: '8',
      }),
      sm: atoms({
        width: '6',
        height: '6',
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
