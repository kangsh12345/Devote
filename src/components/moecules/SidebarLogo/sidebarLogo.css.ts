import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: atoms({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    height: '16',
  }),
  variants: {
    isOpen: {
      true: atoms({ paddingLeft: '6', paddingRight: '3', width: '65' }),
      false: atoms({ paddingLeft: '3', paddingRight: '3', width: 'fit' }),
    },
  },
});
