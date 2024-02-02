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
      card: atoms({
        overflow: 'hidden',
        position: 'relative',
      }),
    },
    direction: {
      row: {},
      column: {},
    },
  },
  compoundVariants: [
    {
      variants: { type: 'card', direction: 'row' },
      style: atoms({ width: 'full', height: 'auto', aspectRatio: '16/9' }),
    },
    {
      variants: { type: 'card', direction: 'column' },
      style: atoms({ width: 'full', height: 'auto', aspectRatio: '5/4' }),
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
      borderRadius: 'lg',
      backgroundColor: 'backgroundElevatedSecondary',
      flexShrink: 0,
      width: 'full',
      height: 'auto',
      aspectRatio: '16/9',
    }),
    style({
      animation: `${skeletonAnimation} 1.8s infinite`,
    }),
  ],
});
