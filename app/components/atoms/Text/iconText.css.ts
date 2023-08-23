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
      lg: atoms({
        fontSize: '3',
      }),
      md: atoms({ fontSize: '2' }),
      sm: atoms({ fontSize: '1' }),
      xs: atoms({ fontSize: '0' }),
    },
  },
});
