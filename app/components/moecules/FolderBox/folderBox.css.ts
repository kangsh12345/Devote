import { atoms } from '@/app/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      display: 'flex',
      flexDirection: 'column',
      width: '57',
      padding: '2',
      borderColor: 'borderPrimary',
      borderRadius: 'xl',
      borderTopWidth: 'px',
      borderBottomWidth: 'px',
    }),
  ],
});

export const header = recipe({
  base: [
    atoms({
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      paddingBottom: '1',
      borderBottomWidth: 'px',
      borderColor: 'borderPrimary',
    }),
  ],
});

export const addBox = recipe({
  base: [
    atoms({
      display: 'flex',
      gap: '2',
      paddingX: '1',
      paddingY: '2',
    }),
  ],
});

export const emptyBox = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'full',
      paddingTop: '6',
      paddingBottom: '5',
      color: 'textPrimary',
      fontWeight: 500,
    }),
  ],
});
