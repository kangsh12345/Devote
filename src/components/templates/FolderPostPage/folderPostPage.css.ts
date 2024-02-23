import { atoms, vars } from '@/src/css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const cardContainer = recipe({
  base: [style({ width: '100%' })],
  variants: {
    direction: {
      row: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
      }),
      column: {},
    },
  },
});

style({
  width: '100%',
});

export const ulContainer = [
  atoms({
    position: 'absolute',
    right: '5',
    top: '5',
    zIndex: '20',
  }),
];

const animations = keyframes({
  '0%': { transform: 'scale(0.8)', opacity: 0.8, transformOrigin: 'top' },
  '100%': { transform: 'scale(1)', opacity: 1, transformOrigin: 'top' },
});

export const ulBox = recipe({
  base: [
    atoms({
      borderWidth: 'px',
      borderColor: 'borderPrimary',
      display: 'block',
      borderRadius: 'base',
      backgroundColor: 'backgroundBase',
      color: 'textSecondary',
      wordWrap: 'break-word',
      width: '36',
      boxShadow: 'lg',
    }),
    style({
      animation: `${animations} 0.2s`,
    }),
  ],
  variants: {
    size: {
      lg: atoms({ fontSize: '2', width: '28' }),
      md: atoms({ fontSize: '1', width: '24' }),
      sm: atoms({ fontSize: '0', width: '20' }),
    },
  },
});

export const liValue = recipe({
  base: [
    atoms({
      transitionProperty: 'transform',
      transitionTimingFunction: 'inOut',
      transitionDuration: '100',
      fontSize: '1',
      paddingY: '3',
      paddingX: '4',
    }),
    style({
      selectors: {
        ':hover&': { backgroundColor: 'unset', color: vars.colors.textPrimary },
      },
    }),
  ],
});
