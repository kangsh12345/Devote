import { atoms } from '@/src/css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const rootRow = recipe({
  base: atoms({
    position: 'relative',
    padding: '5',
    flexShrink: 0,
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
