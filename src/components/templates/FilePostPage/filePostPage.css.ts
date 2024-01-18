import { atoms } from '@/src/css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const markdownBox = recipe({
  base: [
    atoms({
      display: 'flex',
      zIndex: '10',
    }),
  ],
  variants: {
    own: {
      true: style({ height: 'calc(100vh - 112px)' }),
      false: style({ height: 'calc(100vh - 64px)' }),
    },
  },
});

globalStyle('body .w-md-editor-text', {
  paddingBottom: '48px',
});

globalStyle('body .w-md-editor', {
  width: '100%',
});
