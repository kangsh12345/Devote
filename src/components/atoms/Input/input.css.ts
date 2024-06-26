import { atoms } from '@/src/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      color: 'textPrimary',
      display: 'flex',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
      flexShrink: 0,
      boxSizing: 'border-box',
    }),
  ],

  variants: {
    size: {
      lg: atoms({
        height: '14',
        fontSize: '3',
      }),
      md: atoms({ height: '10', fontSize: '2' }),
      sm: atoms({ height: '8', fontSize: '1' }),
      xs: atoms({ height: '6', fontSize: '0' }),
    },
    variant: {
      outline: atoms({
        backgroundColor: 'backgroundBase',
        borderWidth: 'px',
      }),
      filled: atoms({
        backgroundColor: 'gray100',
        borderWidth: 'px',
      }),
      flushed: atoms({
        backgroundColor: 'backgroundBase',
        borderBottomWidth: 'px',
      }),
    },
    disabled: {
      true: [
        atoms({
          borderColor: 'borderSecondary',
        }),
        style({
          opacity: '0.4',
        }),
      ],
      false: {},
    },
    error: {
      true: atoms({
        borderColor: 'redPrimary',
        cursor: 'default',
      }),
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'filled',
        size: 'lg',
      },
      style: atoms({ borderRadius: 'md' }),
    },
    {
      variants: {
        variant: 'filled',
        size: 'md',
      },
      style: atoms({ borderRadius: 'base' }),
    },
    {
      variants: {
        variant: 'filled',
        size: 'sm',
      },
      style: atoms({ borderRadius: 'base' }),
    },
    {
      variants: {
        variant: 'filled',
        size: 'xs',
      },
      style: atoms({ borderRadius: 'sm' }),
    },
    {
      variants: {
        variant: 'outline',
        size: 'lg',
      },
      style: atoms({ borderRadius: 'md' }),
    },
    {
      variants: {
        variant: 'outline',
        size: 'md',
      },
      style: atoms({ borderRadius: 'base' }),
    },
    {
      variants: {
        variant: 'outline',
        size: 'sm',
      },
      style: atoms({ borderRadius: 'base' }),
    },
    {
      variants: {
        variant: 'outline',
        size: 'xs',
      },
      style: atoms({ borderRadius: 'sm' }),
    },
  ],
});

const container = atoms({
  display: 'flex',
  alignItems: 'center',
  height: 'full',
  lineHeight: 0,
});

const text = atoms({
  color: 'textPrimary',
});

const affix = style([container, text, style({ lineHeight: 'normal' })]);
export const leftIcon = recipe({
  variants: {
    size: {
      lg: style([affix, atoms({ paddingLeft: '4', paddingRight: '2' })]),
      md: style([affix, atoms({ paddingLeft: '4', paddingRight: '2' })]),
      sm: style([affix, atoms({ paddingLeft: '3', paddingRight: '1.5' })]),
      xs: style([affix, atoms({ paddingLeft: '2', paddingRight: '1' })]),
    },
  },
});

export const rightIcon = recipe({
  variants: {
    size: {
      lg: style([affix, atoms({ paddingLeft: '2', paddingRight: '4' })]),
      md: style([affix, atoms({ paddingLeft: '2', paddingRight: '4' })]),
      sm: style([affix, atoms({ paddingLeft: '1.5', paddingRight: '3' })]),
      xs: style([affix, atoms({ paddingLeft: '1', paddingRight: '2' })]),
    },
  },
});

export const input = recipe({
  base: [
    atoms({
      position: 'relative',
      width: 'full',
      outline: 'none',
    }),
  ],
  variants: {
    size: {
      lg: atoms({
        borderRadius: 'md',
      }),
      md: atoms({ borderRadius: 'base' }),
      sm: atoms({ borderRadius: 'base' }),
      xs: atoms({ borderRadius: 'sm' }),
    },
    variant: {
      outline: atoms({ backgroundColor: 'backgroundBase' }),
      filled: atoms({ backgroundColor: 'gray100' }),
      flushed: atoms({ backgroundColor: 'backgroundBase' }),
    },
    uppercase: {
      true: atoms({
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
  variants: {
    size: {
      lg: [style([container, text, atoms({ paddingX: '4' })])],
      md: [style([container, text, atoms({ paddingX: '4' })])],
      sm: [style([container, text, atoms({ paddingX: '3' })])],
      xs: [style([container, text, atoms({ paddingX: '2' })])],
    },
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
