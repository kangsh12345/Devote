import { vars } from '@/app/css';
import { globalStyle, style } from '@vanilla-extract/css';

export const switcher = style({});

globalStyle(`${switcher} > img`, {
  filter: vars.colors.filterTextPrimary,
});
