import { atoms, vars } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      borderRadius: 'lg',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }),
  ],
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
    variant: {
      normal: [
        atoms({
          backgroundColor: 'backgroundBase',
          flexShrink: 0,
        }),
      ],
      outline: [
        atoms({
          borderWidth: 'px',
          borderColor: 'borderSecondary',
          backgroundColor: {
            base: 'backgroundBase',
            hover: 'opacityBlack100',
          },
          width: 'full',
        }),
      ],
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'normal', size: 'sm' },
      style: [atoms({ width: '7', height: '7' })],
    },
    {
      variants: { variant: 'normal', size: 'md' },
      style: [atoms({ width: '8', height: '8' })],
    },
    {
      variants: { variant: 'normal', size: 'lg' },
      style: [atoms({ width: '9', height: '9' })],
    },
    {
      variants: { variant: 'normal', size: 'xl' },
      style: [atoms({ width: '10', height: '10' })],
    },
    {
      variants: { variant: 'outline', size: 'sm' },
      style: [atoms({ height: '5' })],
    },
    {
      variants: { variant: 'outline', size: 'md' },
      style: [atoms({ height: '6' })],
    },
    {
      variants: { variant: 'outline', size: 'lg' },
      style: [atoms({ height: '8' })],
    },
    {
      variants: { variant: 'outline', size: 'xl' },
      style: [atoms({ height: '10' })],
    },
  ],
});

export const IconWrapper = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  ],
  variants: {
    size: {
      sm: atoms({ width: '4', height: '4' }),
      md: atoms({ width: '5', height: '5' }),
      lg: atoms({ width: '6', height: '6' }),
      xl: atoms({ width: '7', height: '7' }),
    },
    variant: {
      normal: style({ filter: vars.colors.filterTextPrimary }),
      outline: style({ filter: vars.colors.filterTextSecondary }),
    },
  },
});
