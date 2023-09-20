import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      color: 'textPrimary',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '16',
      backgroundColor: 'backgroundElevatedSecondary',
      borderBottomWidth: 'px',
      borderColor: 'borderPrimary',
      overflow: 'hidden',
    }),
  ],
  variants: {
    type: {
      popular: atoms({ paddingX: '19.5' }),
      folder: atoms({ paddingX: '19.5' }),
      myFolder: atoms({ paddingX: '19.5' }),
      post: atoms({ paddingX: '19.5' }),
      write: atoms({ paddingX: '19.5' }),
      auth: atoms({ paddingX: '8' }),
    },
  },
});

export const box = recipe({
  base: [
    atoms({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'full',
    }),
  ],
});

export const switcher = recipe({
  base: [
    atoms({ position: 'absolute', right: '8', top: '0' }),
    style({ marginTop: -8 }),
  ],
});
