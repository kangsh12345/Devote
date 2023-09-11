import { atoms, vars } from '@/src/css';
import { globalStyle, style } from '@vanilla-extract/css';

export const switcher = [
  style({
    selectors: {
      ':hover&': { transform: 'translateY(8px)' },
    },
  }),
  atoms({ flexShrink: 0, cursor: 'pointer' }),
];

globalStyle(`${switcher} > img`, {
  filter: vars.colors.filterTextPrimary,
});
