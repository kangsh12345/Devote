import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const li = style({});

export const fileListHover = recipe({
  base: [
    atoms({
      position: 'absolute',
      zIndex: '10',
      left: '0',
      width: 'full',
      height: '6',
    }),
  ],
  variants: {
    active: {
      true: atoms({
        backgroundColor: { hover: 'opacityBlack200', base: 'opacityBlack100' },
      }),
      false: atoms({
        backgroundColor: { hover: 'opacityBlack100' },
      }),
    },
  },
});

export const ellipsis = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
});
