import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';

export const root = [
  atoms({ opacity: '0' }),
  style({
    selectors: {
      ':hover&': { opacity: 1 },
    },
  }),
];
