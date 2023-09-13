import { atoms } from '@/src/css';
import { keyframes, style } from '@vanilla-extract/css';
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

const skeletonAnimation = keyframes({
  '0%': {
    backgroundColor: 'rgba(165, 165, 165, 0.1)',
  },

  '50%': {
    backgroundColor: 'rgba(165, 165, 165, 0.3)',
  },

  '100%': {
    backgroundColor: 'rgba(165, 165, 165, 0.1)',
  },
});

export const skeleton = recipe({
  base: [
    atoms({
      display: 'flex',
      width: '76',
      height: '60',
      borderRadius: 'lg',
      backgroundColor: 'backgroundElevatedSecondary',
      flexShrink: 0,
    }),
    style({
      animation: `${skeletonAnimation} 1.8s infinite`,
    }),
  ],
});
