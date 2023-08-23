import { atoms } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
      fontWeight: 500,
    }),
  ],
  variants: {
    size: {
      lg: atoms({
        paddingX: '6',
        height: '10',
        fontSize: '3',
      }),
      md: atoms({ paddingX: '4', height: '8', fontSize: '2' }),
      sm: atoms({ paddingX: '3', height: '7', fontSize: '1', lineHeight: 0 }),
      xs: atoms({ paddingX: '3', height: '6', fontSize: '0', lineHeight: 0 }),
    },
    variant: {
      solid: {},
      outline: atoms({ borderWidth: 'px' }),
    },
    radius: {
      full: atoms({ borderRadius: 'full' }),
      md: atoms({ borderRadius: 'md' }),
    },
    color: {
      black: {},
      brand: {},
      gray: {},
      blue: {},
      red: {},
      green: {},
      orange: {},
    },
    disabled: {
      true: [
        atoms({
          cursor: 'not-allowed',
        }),
        style({
          opacity: 0.5,
        }),
      ],
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'solid', color: 'black' },
      style: atoms({ backgroundColor: 'gray900', color: 'textWhite' }),
    },
    {
      variants: { variant: 'outline', color: 'black' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'textPrimary',
        borderColor: 'textPrimary',
      }),
    },
    {
      variants: { variant: 'solid', color: 'gray' },
      style: atoms({ backgroundColor: 'gray100', color: 'textPrimary' }),
    },
    {
      variants: { variant: 'outline', color: 'gray' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'textPrimary',
        borderColor: 'gray100',
      }),
    },
    {
      variants: { variant: 'solid', color: 'brand' },
      style: atoms({ backgroundColor: 'brandPrimary', color: 'white' }),
    },
    {
      variants: { variant: 'outline', color: 'brand' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'brandPrimary',
        borderColor: 'brandPrimary',
      }),
    },
    {
      variants: { variant: 'solid', color: 'blue' },
      style: atoms({ backgroundColor: 'bluePrimary', color: 'white' }),
    },
    {
      variants: { variant: 'outline', color: 'blue' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'bluePrimary',
        borderColor: 'bluePrimary',
      }),
    },
    {
      variants: { variant: 'solid', color: 'red' },
      style: atoms({ backgroundColor: 'redPrimary', color: 'white' }),
    },
    {
      variants: { variant: 'outline', color: 'red' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'redPrimary',
        borderColor: 'redPrimary',
      }),
    },
    {
      variants: { variant: 'solid', color: 'green' },
      style: atoms({ backgroundColor: 'greenPrimary', color: 'white' }),
    },
    {
      variants: { variant: 'outline', color: 'green' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'greenPrimary',
        borderColor: 'greenPrimary',
      }),
    },
    {
      variants: { variant: 'solid', color: 'orange' },
      style: atoms({ backgroundColor: 'orangePrimary', color: 'white' }),
    },
    {
      variants: { variant: 'outline', color: 'orange' },
      style: atoms({
        backgroundColor: 'gray50',
        color: 'orangePrimary',
        borderColor: 'orangePrimary',
      }),
    },
  ],
});
