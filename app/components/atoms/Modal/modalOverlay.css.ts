import { atoms } from '@/app/css';
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
      backgroundColor: 'opacityBlack500',
      zIndex: '20',
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
