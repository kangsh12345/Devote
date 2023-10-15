import { atoms, vars } from '@/src/css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: [
    atoms({
      position: 'relative',
      cursor: 'pointer',
      paddingTop: 'px',
      flexShrink: 0,
    }),
  ],
  variants: {
    disabled: {
      true: [
        atoms({
          cursor: 'not-allowed',
          opacity: '0.5',
        }),
      ],
      false: {},
    },
  },
});

export const IconBox = recipe({
  base: [
    atoms({
      backgroundColor: { base: 'opacityBlack100', hover: 'opacityBlack200' },
    }),
  ],
  variants: {
    size: {
      lg: atoms({
        height: '9',
        width: '9',
      }),
      md: atoms({
        height: '8',
        width: '8',
      }),
      sm: atoms({
        height: '7',
        width: '7',
      }),
    },
    open: {
      true: atoms({
        backgroundColor: { base: 'opacityBlack300', hover: 'opacityBlack300' },
      }),
      false: {},
    },
  },
});

export const ulContainer = [
  atoms({
    position: 'absolute',
    right: '0',
    top: 'full',
    zIndex: '10',
    paddingTop: '2',
    transitionDuration: '200',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'inOut',
    opacity: '0.5',
  }),
  style({
    selectors: {
      ':hover&': { opacity: 1 },
    },
  }),
];

const animations = keyframes({
  '0%': { transform: 'scale(0.8)', opacity: 0.8, transformOrigin: 'top' },
  '100%': { transform: 'scale(1)', opacity: 1, transformOrigin: 'top ' },
});

export const ulBox = recipe({
  base: [
    atoms({
      borderWidth: 'px',
      borderColor: 'borderPrimary',
      display: 'block',
      borderRadius: 'base',
      backgroundColor: 'backgroundBase',
      color: 'textTertiary',
      width: '52',
      wordWrap: 'break-word',
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
      paddingX: '4',
      paddingY: '3',
      fontSize: '1',
      transitionDuration: '100',
    }),
    style({
      selectors: {
        'li+li&': { border: 'none' },
        ':hover&': { backgroundColor: 'unset', color: vars.colors.textPrimary },
      },
    }),
  ],
  variants: {
    active: {
      true: [
        style({ transform: 'scale(1.04)' }),
        atoms({
          color: 'textPrimary',
        }),
      ],
      false: {},
    },
    heading: {
      1: {},
      2: atoms({ paddingLeft: '6' }),
      3: atoms({ paddingLeft: '8' }),
    },
  },
});
