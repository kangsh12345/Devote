import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      height: '12',
      width: 'full',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.5',
      paddingX: { wide: '4', tablet: '19.5' },
      backgroundColor: 'backgroundElevatedPrimary',
      borderBottomWidth: 'px',
      borderColor: 'borderPrimary',
    }),
  ],
});
