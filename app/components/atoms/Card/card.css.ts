import { atoms } from '@/app/css';
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
        width: 'full',
        height: 'full',
      }),
      card: atoms({
        width: '76',
        height: '60',
      }),
    },
  },
});
