import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    style({
      width: '100%',
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

globalStyle('body .w-md-editor-text-pre > code, body .w-md-editor-text-input', {
  fontSize: '18px !important',
  lineHeight: '24px !important',
  whiteSpace: 'pre-wrap',
});

globalStyle('body .wmde-markdown img', {
  display: 'block',
  margin: '0 auto',
});

globalStyle('body .w-md-editor-text', {
  paddingBottom: '48px',
});
globalStyle('body .w-md-editor-preview', {
  paddingBottom: '48px',
});
