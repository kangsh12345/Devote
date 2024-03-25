import { atoms, vars } from '@/src/css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const rootRow = recipe({
  base: atoms({
    position: 'relative',
    padding: '5',
    flexShrink: 0,
    // maxWidth: '96',
  }),
});

export const wrapperRow = recipe({
  base: atoms({
    display: 'flex',
    width: 'full',
    flexDirection: 'column',
  }),
});

export const cardWrapperRow = recipe({
  base: atoms({
    display: 'flex',
    color: 'textPrimary',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'full',
  }),
});

export const folderIconWrapper = atoms({
  width: 'full',
  height: 'auto',
  aspectRatio: '16/9',
  display: 'flex',
  justifyContent: 'center',
  color: 'textPrimary',
});

export const contentWrapperRow = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
    color: 'textPrimary',
    width: 'full',
    gap: '1',
    paddingTop: '5',
    paddingBottom: '2',
  }),
});

export const overflowRow = recipe({
  base: [
    atoms({
      overflow: 'hidden',
    }),
    style({
      textOverflow: 'ellipsis',
    }),
  ],
  variants: {
    type: {
      title: atoms({ whiteSpace: 'nowrap' }),
      subtitle: style({
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
      }),
    },
  },
});

export const rootColumn = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      paddingTop: '5',
      paddingBottom: '5',
      gap: '6',
    }),
  ],
});

export const contentWrapperColmn = atoms({
  display: 'flex',
  width: 'full',
  paddingY: '1',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const mainContentColumn = atoms({
  display: 'flex',
  height: 'full',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2',
  color: 'textPrimary',
});

export const subtitleColumn = recipe({
  base: [
    atoms({
      display: 'flex',
      height: '6',
      alignItems: 'center',
      color: 'textSecondary',
      fontSize: '3',
    }),
    style({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
    }),
  ],
  variants: {
    variant: {
      card: atoms({ paddingLeft: '2' }),
      cardInFolder: {},
    },
  },
});

export const subContentColumn = recipe({
  base: atoms({
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 'fit',
    height: 'full',
    gap: '2',
    flexShrink: 0,
  }),
  variants: {
    hover: {
      true: atoms({
        display: 'none',
      }),
      false: atoms({
        display: 'flex',
      }),
    },
  },
});

export const dateColumn = atoms({
  display: 'flex',
  width: 'fit',
  height: '12',
  color: 'textTertiary',
  alignItems: 'center',
  fontSize: '3',
  fontWeight: 500,
});

export const folderTitleColumn = atoms({
  display: 'flex',
  alignItems: 'center',
  width: 'full',
  height: '24',
  color: 'textPrimary',
  paddingTop: '1',
  paddingLeft: '1',
  fontSize: '5',
  fontWeight: 700,
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

export const skeleton = style({
  animation: `${skeletonAnimation} 1.8s infinite`,
});

export const ulContainer = recipe({
  base: [
    atoms({
      position: 'absolute',
      zIndex: '20',
    }),
  ],
  variants: {
    direction: {
      row: atoms({ top: '5', right: '5' }),
      column: atoms({ top: '15', right: '0' }),
    },
  },
});

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
