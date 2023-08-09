import { atoms } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      backgroundColor: 'backgroundBase',
      borderWidth: 'px',
      borderColor: 'borderSecondary',
      borderRadius: 'sm',
      color: 'textPrimary',
      display: 'flex',
      fontSize: '0',
      height: '12',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
    }),
  ],
  variants: {
    disabled: {
      true: atoms({
        borderColor: 'borderSecondary',
      }),
      false: {},
    },
    error: {
      true: style([
        atoms({
          borderColor: 'redPrimary',
          cursor: 'default',
        }),
      ]),
    },
  },
});

const container = atoms({
  alignItems: 'center',
  display: 'flex',
  height: 'full',
  lineHeight: 0,
});

const text = atoms({
  color: 'textPrimary',
  fontFamily: 'pretendard',
  fontSize: '0',
});

const affix = style([container, text, style({ lineHeight: 'normal' })]);
export const leftIcon = style([
  affix,
  atoms({ paddingLeft: '4', paddingRight: '2' }),
]);
export const rightIcon = style([
  affix,
  atoms({ paddingRight: '4', paddingLeft: '2' }),
]);

export const input = recipe({
  base: [
    atoms({
      backgroundColor: 'backgroundBase',
      position: 'relative',
      width: 'full',
    }),
  ],
  variants: {
    uppercase: {
      true: style({
        textTransform: 'uppercase',
      }),
      false: {},
    },
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
      false: {},
    },
    type: {
      number: style({
        fontFeatureSettings: "'kern' 1,  'tnum' 1, 'calt' 0",
        fontVariantNumeric: 'tabular-nums',
        MozAppearance: 'textfield',
      }),
      text: {},
    },
    theme: {
      dark: style({
        selectors: {
          '&::-webkit-calendar-picker-indicator': { filter: 'invert(100%)' },
        },
      }),
      light: {},
    },
  },
});

export const ghost = recipe({
  base: [
    atoms({
      inset: '0',
      position: 'absolute',
      pointerEvents: 'none',
      whiteSpace: 'pre',
    }),
    style({ lineHeight: 'normal' }),
  ],
  variants: {
    type: {
      number: style({
        fontFeatureSettings: "'kern' 1,  'tnum' 1, 'calt' 0",
        fontVariantNumeric: 'tabular-nums',
      }),
      text: {},
    },
  },
});

export const variants = recipe({
  base: [style([container, text, atoms({ paddingX: '4' })])],
  variants: {
    leftIcon: {
      true: atoms({
        paddingLeft: 'none',
      }),
    },
    rightIcon: {
      true: atoms({
        paddingRight: 'none',
      }),
    },
  },
});

export const max = style([
  atoms({
    // backgroundColor: 'foregroundSecondary',
    borderRadius: 'md',
    color: { base: 'textSecondary', hover: 'textPrimary' },
    cursor: 'pointer',
    fontSize: '0',
    fontWeight: 700,
    height: 'max',
    lineHeight: 0,
    padding: '2',
    textTransform: 'uppercase',
    transitionDuration: '150',
    transitionProperty: 'colors',
    transitionTimingFunction: 'inOut',
    visibility: 'hidden',
  }),
]);
