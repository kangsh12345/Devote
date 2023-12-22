import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';

export const root = style({
  height: 'calc(100vh - 64px)',
});

export const markdownContainer = atoms({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '12',
  paddingX: { wide: '4', tablet: '19.5' },
  backgroundColor: 'backgroundElevatedPrimary',
  borderBottomWidth: 'px',
  borderColor: 'borderPrimary',
});

export const markdown = atoms({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'full',
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
