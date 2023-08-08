import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '../../css';

export const variants = recipe({
  variants: {
    color: {
      brand: style([
        atoms({
          display: 'flex',
        }),
        style({
          width: 100,
          height: 100,
        }),
      ]),
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
