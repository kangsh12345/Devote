import { style } from '@vanilla-extract/css';

export const base = style({
  margin: 0,
  padding: 0,
  border: 0,
  boxSizing: 'border-box',
  borderColor: '#1a202c',
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
});

const div = style({
  lineHeight: 0,
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
  label,
};

export type Element = keyof typeof element;
