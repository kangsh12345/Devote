import { atoms } from '@/app/css';
import { recipe } from '@vanilla-extract/recipes';

export const text = recipe({
  base: [atoms({ fontWeight: 500, color: 'textPrimary', flexShrink: 0 })],
  variants: {
    size: {
      sm: atoms({ fontSize: '0' }),
      md: atoms({ fontSize: '2' }),
      lg: atoms({ fontSize: '5' }),
      xl: atoms({ fontSize: '7' }),
    },
  },
});
