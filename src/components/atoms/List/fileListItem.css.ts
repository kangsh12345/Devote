import { globalStyle, style } from '@vanilla-extract/css';

export const li = style({});

globalStyle(`${li} > ul`, {
  marginLeft: 12,
});
