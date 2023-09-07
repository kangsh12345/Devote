import { atoms } from '@/app/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: 'viewHeight',
      backgroundColor: 'backgroundBase',
    }),
  ],
  variants: {
    isOpen: {
      true: atoms({ width: '64' }),
      false: atoms({ width: 'fit' }),
    },
  },
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
  },
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
