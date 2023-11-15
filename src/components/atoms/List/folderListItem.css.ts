import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      color: 'textPrimary',
      fontWeight: 700,
      cursor: 'pointer',
    }),
  ],
  variants: {
    size: {
      xl: atoms({ fontSize: '3' }),
      lg: atoms({ fontSize: '2' }),
      md: atoms({ fontSize: '1' }),
      sm: atoms({ fontSize: '0' }),
    },
  },
});

export const textHover = atoms({
  textDecoration: { hover: 'underline' },
});
