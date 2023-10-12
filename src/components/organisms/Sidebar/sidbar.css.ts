import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'relative',
      flexDirection: 'column',
      width: 'fit',
      height: 'viewHeight',
      backgroundColor: 'backgroundBase',
      flexShrink: 0,
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
      sidebar: atoms({ display: { wide: 'none', tablet: 'flex' } }),
      drawer: atoms({ display: 'flex' }),
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
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'full',
      height: 'full',
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
      flexDirection: 'column',
      gap: '10',
    }),
  ],
});

export const bottom = recipe({
  base: [
    atoms({
      display: 'flex',
      flexDirection: 'column',
      height: 'fit',
      paddingTop: '6',
      gap: '12',
      paddingBottom: '1',
      borderTopWidth: 'px',
      borderColor: 'borderSecondary',
    }),
  ],
});
