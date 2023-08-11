import { atoms } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [atoms({})],
  variants: {
    size: {
      lg: atoms({
        paddingLeft: '4',
        paddingRight: '2',
        fontSize: '2',
        height: '9',
        width: '28',
      }),
      md: atoms({
        paddingLeft: '4',
        paddingRight: '2',
        fontSize: '1',
        height: '8',
        width: '24',
      }),
      sm: atoms({
        paddingLeft: '3',
        paddingRight: '1.5',
        fontSize: '0',
        height: '8',
        width: '20',
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
