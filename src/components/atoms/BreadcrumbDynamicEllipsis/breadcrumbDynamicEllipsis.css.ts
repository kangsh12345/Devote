import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = [
  atoms({
    width: 'full',
    overflow: 'hidden',
    textAlign: 'center',
    paddingX: '2',
  }),
  style({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  }),
];

export const ellipsisStyle = recipe({
  base: [],
  variants: {
    last: {
      true: [
        style({
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }),
      ],
      false: {},
    },
  },
});
