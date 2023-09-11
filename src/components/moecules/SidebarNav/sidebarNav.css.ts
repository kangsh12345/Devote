import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      cursor: 'pointer',
      borderRadius: 'md',
      width: 'full',
      display: 'flex',
    }),
  ],
  variants: {
    type: {
      main: {},
      sub: {},
    },
    size: {
      lg: {},
      md: {},
      sm: {},
    },
    isActive: {
      true: atoms({ backgroundColor: 'opacityBlack100' }),
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        type: 'main',
        size: 'lg',
      },
      style: atoms({ padding: '2.5' }),
    },
    {
      variants: {
        type: 'main',
        size: 'md',
      },
      style: atoms({ padding: '2' }),
    },
    {
      variants: {
        type: 'main',
        size: 'sm',
      },
      style: atoms({ padding: '1.5' }),
    },
    {
      variants: {
        type: 'sub',
        size: 'lg',
      },
      style: atoms({ paddingX: '2.5', paddingY: '1.5' }),
    },
    {
      variants: {
        type: 'sub',
        size: 'md',
      },
      style: atoms({ paddingX: '2', paddingY: '1' }),
    },
    {
      variants: {
        type: 'sub',
        size: 'sm',
      },
      style: atoms({ paddingX: '1.5', paddingY: '1' }),
    },
  ],
});
