import { atoms } from '@/src/css';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = atoms({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'backgroundBase',
  paddingTop: '6',
  paddingBottom: '5',
  flexShrink: 0,
  width: 'full',
});

export const ul = style({});

globalStyle(`${ul} > li:not(:last-child)`, {
  marginBottom: 4,
});
