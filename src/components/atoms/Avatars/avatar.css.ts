import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const text = recipe({
  base: [atoms({ fontWeight: 500, flexShrink: 0 })],
  variants: {
    size: {
      sm: atoms({ fontSize: '0' }),
      md: atoms({ fontSize: '2' }),
      lg: atoms({ fontSize: '5' }),
      xl: atoms({ fontSize: '7' }),
    },
  },
});
