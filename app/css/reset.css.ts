import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from './vars.css';

export const base = style({
  margin: 0,
  padding: 0,
  border: 0,
  boxSizing: 'border-box',
  borderColor: vars.colors.borderSecondary,
  borderStyle: 'solid',
  borderWidth: 0,
  fontSize: '100%',
  fontFamily: `Pretendard,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  "Helvetica Neue",
  Arial,
  sans-serif,
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",`,
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
  transitionDuration: '200ms',
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.42, 0, 0.58, 1)',
  userSelect: 'none',
});

const button = style({
  width: 'auto',
  overflow: 'visible',
  WebkitAppearance: 'none',
  selectors: {
    '&::-moz-focus-inner': {
      borderStyle: 'none',
      padding: 0,
    },
  },
});

// HTML5 display-role reset for older browsers
const block = style({
  display: 'block',
});

const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  textAlign: 'initial',
});

const li = style({
  cursor: 'pointer',
  fontSize: '0.875rem',
  padding: '0.75rem 1rem',
  ':hover': { backgroundColor: vars.colors.backgroundSurfaceBasePressed },
  selectors: {
    'li+li&': {
      borderTop: `1px solid ${vars.colors.borderSecondary}`,
    },
  },
});

const div = style({
  // lineHeight: 0,
});

const input = style({
  appearance: 'none',
  ':disabled': {
    cursor: 'inherit',
  },
});

const label = style({
  cursor: 'inherit',
});

const a = style({
  textDecoration: 'none',
  color: 'inherit',
});

export const element: Partial<Record<keyof JSX.IntrinsicElements, string>> = {
  article: block,
  aside: block,
  details: block,
  figcaption: block,
  footer: block,
  header: block,
  hgroup: block,
  menu: block,
  nav: block,
  section: block,
  textarea: block,
  a,
  button,
  div,
  input,
  ol: list,
  ul: list,
  li: li,
  label,
};

export type Element = keyof typeof element;

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  background: vars.colors.backgroundBase,
  color: vars.colors.black,
});

globalStyle('body', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  // fontFamily:
  //   'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,  "Helvetica Neue", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFamily: 'Pretendard',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  transition: 'background 0.125s ease-in 0s',
});

globalStyle('h1, h2, h3, h4, p', {
  margin: 0,
});

globalStyle('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  // overflow: 'hidden',
});

globalStyle('a', {
  textDecoration: 'none',
});
