import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: atoms({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    height: '16',
    gap: '8',
  }),
  variants: {
    isOpen: {
      true: {},
      false: {},
    },
    type: {
      sidebar: atoms({ justifyContent: 'center' }),
      drawer: atoms({ paddingLeft: '4', paddingRight: '6', width: '65' }),
    },
  },
  compoundVariants: [
    {
      variants: { isOpen: false, type: 'sidebar' },
      style: atoms({ paddingLeft: '4', paddingRight: '4', width: 'fit' }),
    },
    {
      variants: { isOpen: true, type: 'sidebar' },
      style: atoms({ paddingLeft: '4', paddingRight: '6', width: '65' }),
    },
  ],
});
