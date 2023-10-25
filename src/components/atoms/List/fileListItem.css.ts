import { globalStyle, style } from '@vanilla-extract/css';

export const li = style({});

globalStyle(`${li} > div > ul`, {
  marginLeft: 12,
});
