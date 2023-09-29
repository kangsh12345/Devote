import { atoms } from '@/src/css';

export const root = atoms({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '106',
  gap: '6',
  padding: '10',
  borderWidth: 'px',
  borderColor: 'borderSecondary',
  backgroundColor: 'backgroundBase',
  height: 'fit',
  borderRadius: 'md',
});

export const title = atoms({
  fontSize: '6',
  fontWeight: 700,
});

export const inputStack = atoms({
  display: 'flex',
  flexDirection: 'column',
  width: 'full',
  gap: '5',
});
