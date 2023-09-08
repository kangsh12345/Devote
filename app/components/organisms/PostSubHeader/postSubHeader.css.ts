import { atoms } from '@/app/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '12',
      gap: '1.5',
      paddingX: '19.5',
      backgroundColor: 'backgroundElevatedPrimary',
      borderLeftWidth: 'px',
      borderBottomWidth: 'px',
      borderColor: 'borderPrimary',
    }),
  ],
});
