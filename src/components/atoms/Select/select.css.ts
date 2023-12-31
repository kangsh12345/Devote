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
    size: {
      lg: atoms({
        paddingLeft: '4',
        paddingRight: '3',
        fontSize: '2',
        height: '9',
        width: '28',
      }),
      md: atoms({
        paddingLeft: '4',
        paddingRight: '2.5',
        fontSize: '1',
        height: '8',
        width: '24',
      }),
      sm: atoms({
        paddingLeft: '3',
        paddingRight: '1.5',
        fontSize: '0',
        height: '8',
        width: '20',
      }),
    },
    disabled: {
      true: [
        atoms({
          cursor: 'not-allowed',
        }),
        style({
          opacity: 0.5,
        }),
      ],
      false: {},
    },
  },
});

export const ulContainer = atoms({
  position: 'absolute',
  right: '0',
  top: 'full',
  zIndex: '10',
  paddingTop: '3',
});

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
      boxShadow: 'base',
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
    style({
      fontSize: '0.875rem',
      padding: '0.75rem 1rem',
      selectors: {
        'li+li&': {
          borderTop: `1px solid ${vars.colors.borderSecondary}`,
        },
        ':hover&': {
          backgroundColor: vars.colors.backgroundSurfaceBasePressed,
        },
      },
    }),
  ],
  variants: {
    active: {
      true: atoms({ color: 'brandPrimary', fontWeight: 500 }),
      false: {},
    },
  },
});
