import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
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
