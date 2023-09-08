import { atoms } from '@/app/css';
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
      paddingX: '19.5',
      backgroundColor: 'backgroundElevatedSecondary',
      borderLeftWidth: 'px',
      borderBottomWidth: 'px',
      borderColor: 'borderPrimary',
      overflow: 'hidden',
    }),
  ],
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

export const switcher = [
  atoms({ position: 'absolute', right: '8', top: '0' }),
  style({ marginTop: -8 }),
];
