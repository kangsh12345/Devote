import { atoms } from '@/src/css';
import { globalStyle } from '@vanilla-extract/css';

export const li = atoms({});

globalStyle(`${li} > div > ul`, {
  marginLeft: 12,
});
