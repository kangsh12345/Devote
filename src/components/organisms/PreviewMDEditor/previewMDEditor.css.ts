import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  height: 'calc(100vh - 112px)',
  // height: 'calc(100vh - 64px)',
  width: '100%',
  zIndex: '10',
});

globalStyle('body .w-md-editor-text-pre > code, body .w-md-editor-text-input', {
  fontSize: '18px !important',
  lineHeight: '24px !important',
  minHeight: 'calc(100vh - 112px)',
  whiteSpace: 'pre-wrap',
});

globalStyle('body .w-md-editor-text', {
  paddingBottom: '48px',
});
globalStyle('body .w-md-editor-preview', {
  paddingBottom: '48px',
});
