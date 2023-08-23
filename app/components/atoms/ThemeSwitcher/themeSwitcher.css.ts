import { atoms, vars } from '@/app/css';
import { globalStyle, style } from '@vanilla-extract/css';

export const switcher = [
  style({
    selectors: {
      ':hover&': { transform: 'translateY(8px)' },
    },
  }),
  atoms({ flexShrink: 0 }),
];

globalStyle(`${switcher} > img`, {
  filter: vars.colors.filterTextPrimary,
});
