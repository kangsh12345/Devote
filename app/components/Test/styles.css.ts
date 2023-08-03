import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '../../css';

export const variants = recipe({
  variants: {
    color: {
      brand: style([
        atoms({
          display: 'flex',
          color: 'brandPrimary',
          backgroundColor: {
            base: 'brandPrimary',
            hover: 'brandSecondary',
          },
          fontFamily: 'pretendard',
          fontSize: '11',
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
