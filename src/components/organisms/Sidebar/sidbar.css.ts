import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'relative',
      flexDirection: 'column',
      width: 'fit',
      height: 'viewHeight',
      backgroundColor: 'backgroundBase',
      borderRightWidth: 'px',
      borderColor: 'borderPrimary',
    }),
  ],
  variants: {
    isOpen: {
      true: {},
      false: {},
    },
    type: {
      sidebar: atoms({
        display: { wide: 'none', tablet: 'flex' },
        flexShrink: 0,
      }),
      drawer: atoms({ display: 'flex', flexShrink: 0 }),
    },
  },
  compoundVariants: [
    {
      variants: { isOpen: true, type: 'sidebar' },
      style: atoms({ width: '65' }),
    },
    {
      variants: { isOpen: false, type: 'sidebar' },
      style: atoms({ width: 'fit' }),
    },
  ],
});

export const contentBox = recipe({
  base: [
    atoms({
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'full',
    }),
    style({
      height: 'calc(100% - 64px)',
    }),
  ],
  variants: {
    isOpen: {
      true: atoms({ paddingX: '4', paddingY: '6' }),
      false: {},
    },
    type: {
      sidebar: {},
      drawer: {},
    },
  },
  compoundVariants: [
    {
      variants: { isOpen: false, type: 'drawer' },
      style: atoms({ paddingX: '4', paddingY: '6' }),
    },
  ],
});

export const top = recipe({
  base: [
    atoms({
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      height: 'fit',
      overflow: 'hidden',
      paddingBottom: '8',
    }),
  ],
});

export const bottom = recipe({
  base: [
    atoms({
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      height: 'fit',
      paddingTop: '6',
      gap: '12',
      paddingBottom: '1',
      marginTop: '8',
      borderTopWidth: 'px',
      borderColor: 'borderSecondary',
    }),
  ],
});

export const folderBoxWrapper = atoms({
  display: 'flex',
  flexDirection: 'column',
  gap: '8',
  height: 'full',
  overflow: 'scroll',
});
