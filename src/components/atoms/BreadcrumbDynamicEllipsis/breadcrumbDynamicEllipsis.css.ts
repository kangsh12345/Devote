import { atoms, vars } from '@/src/css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const animations = keyframes({
  '0%': { transform: 'scale(0.8)', opacity: 0.8, transformOrigin: 'top' },
  '100%': { transform: 'scale(1)', opacity: 1, transformOrigin: 'top' },
});

export const root = [
  atoms({
    position: 'relative',
    width: 'full',
    overflow: 'hidden',
    paddingX: '2',
  }),
  style({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  }),
];

export const dots = atoms({
  padding: '1.5',
  borderRadius: 'base',
  backgroundColor: {
    hover: 'opacityBlack100',
  },
  cursor: 'pointer',
});

export const popoverFirstItem = atoms({
  fontSize: '0',
  paddingY: '2',
  paddingX: '4',
  color: 'textPrimary',
});

export const ellipsisStyle = recipe({
  base: [],
  variants: {
    last: {
      true: [
        style({
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }),
      ],
      false: {},
    },
  },
});

export const ellipsis = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
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
