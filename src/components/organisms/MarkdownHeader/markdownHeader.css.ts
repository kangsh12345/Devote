import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '12',
      paddingX: '19.5',
      backgroundColor: 'backgroundElevatedPrimary',
      borderLeftWidth: 'px',
      borderBottomWidth: 'px',
      borderColor: 'borderPrimary',
    }),
  ],
});

export const markdown = recipe({
  base: [
    atoms({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'full',
      position: 'relative',
    }),
  ],
});

export const iconBox = atoms({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '12',
  height: '12',
  color: 'textPrimary',
  cursor: 'pointer',
});
