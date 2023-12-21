import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';

export const root = style({
  height: 'calc(100vh - 64px)',
});

export const iconBox = atoms({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: { wide: '8', tablet: '12' },
  height: '12',
  padding: { wide: '1.5', tablet: '3' },
  color: 'textPrimary',
  cursor: 'pointer',
});
