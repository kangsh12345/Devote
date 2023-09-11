import { style } from '@vanilla-extract/css';

export const root = style({
  opacity: 0,
  selectors: {
    ':hover&': { opacity: 1 },
  },
});
