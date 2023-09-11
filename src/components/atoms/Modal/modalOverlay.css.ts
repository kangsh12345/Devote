import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '20',
      backgroundColor: 'opacityWhite600',
    }),
    style({ boxSizing: 'border-box', outline: 0 }),
  ],
  variants: {
    visible: {
      true: atoms({ display: 'block' }),
      false: atoms({ display: 'none' }),
    },
  },
});
