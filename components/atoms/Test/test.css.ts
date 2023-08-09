import { atoms } from '@/css';
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const variants = recipe({
  variants: {
    color: {
      brand: style([
        atoms({
          display: 'flex',
          width: '20',
          height: '20',
          backgroundColor: 'brandPrimary',
          color: 'textPrimary',
        }),
      ]),
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
