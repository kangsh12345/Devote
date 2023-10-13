import { atoms } from '@/src/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      zIndex: '50',
      display: { wide: 'flex', tablet: 'none' },
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    }),
  ],
});

export const overlay = recipe({
  base: [
    atoms({
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      backgroundColor: 'opacityBlack500',
      display: 'block',
    }),
  ],
  // opacity setOpen에 따라
});

export const drawer = recipe({
  base: [
    atoms({
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      width: '65',
      backgroundColor: 'backgroundBase',
    }),
  ],
});
