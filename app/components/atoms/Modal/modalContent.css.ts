import { atoms } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = [atoms({ zIndex: '30' }), style({ maxWidth: 448 })];

export const closeButton = atoms({
  position: 'absolute',
  right: '3.5',
  top: '2',
});

export const header = atoms({
  fontSize: '3',
  fontWeight: 700,
  paddingX: '3',
  paddingY: '2',
});

export const content = atoms({
  fontSize: '2',
  paddingX: '3',
  paddingTop: '2',
  paddingBottom: '4',
});

export const footer = recipe({
  base: [
    atoms({
      paddingX: '3',
    }),
  ],
  variants: {
    type: {
      left: atoms({ paddingY: '2' }),
      right: atoms({ paddingY: '2' }),
      row: atoms({ paddingY: '2' }),
      column: atoms({ paddingY: '6' }),
    },
  },
});
