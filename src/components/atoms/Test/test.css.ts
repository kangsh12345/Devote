import { style } from '@vanilla-extract/css';

export const cardContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
});
