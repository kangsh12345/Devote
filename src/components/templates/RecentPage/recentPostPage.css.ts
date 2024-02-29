import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const cardContainer = recipe({
  base: [style({ width: '100%' })],
  variants: {
    direction: {
      row: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
      }),
      column: {},
    },
  },
});

style({
  width: '100%',
});
