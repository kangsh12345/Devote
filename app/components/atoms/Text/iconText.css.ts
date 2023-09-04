import { atoms } from '@/app/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 500,
    }),
  ],
  variants: {
    size: {
      xl: atoms({
        fontSize: '3',
      }),
      lg: atoms({ fontSize: '2' }),
      md: atoms({ fontSize: '1' }),
      sm: atoms({ fontSize: '0' }),
    },
  },
});
