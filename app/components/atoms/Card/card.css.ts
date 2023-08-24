import { atoms } from '@/app/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '76',
      height: '60',
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
  },
});
