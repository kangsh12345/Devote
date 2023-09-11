import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'lg',
      backgroundColor: 'backgroundBase',
      flexShrink: 0,
    }),
  ],
  variants: {
    variant: {
      elevated: atoms({ boxShadow: 'base' }),
      outline: atoms({
        borderWidth: 'px',
        borderColor: 'borderSecondary',
        boxShadow: 'inline',
      }),
      filled: atoms({ boxShadow: 'inline' }),
    },
    type: {
      modal: atoms({
        borderWidth: 'px',
        borderColor: 'borderSecondary',
        boxShadow: 'md',
        width: 'full',
        height: 'full',
      }),
      card: {},
    },
    size: {
      md: {},
      sm: {},
    },
  },
  compoundVariants: [
    {
      variants: { type: 'card', size: 'md' },
      style: atoms({ width: '76', height: '60' }),
    },
    {
      variants: { type: 'card', size: 'sm' },
      style: atoms({ width: '30', height: '24' }),
    },
  ],
});
