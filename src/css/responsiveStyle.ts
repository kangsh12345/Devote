import { StyleRule } from '@vanilla-extract/css';

import { Breakpoint, breakpoints } from './breakpoints';

type CSSProps = Omit<StyleRule, '@media' | '@supports'>;

const makeMediaQuery = (breakpoint: Breakpoint) => (styles?: CSSProps) =>
  !styles || Object.keys(styles).length === 0
    ? {}
    : {
        [`screen and (min-width: ${breakpoints[breakpoint]}px)`]: styles,
      };

const mediaQuery = {
  mobile: makeMediaQuery('mobile'),
  table: makeMediaQuery('table'),
  desktop: makeMediaQuery('desktop'),
};

type ResponsiveStyle = {
  wide?: CSSProps;
  mobile?: CSSProps;
  table?: CSSProps;
  desktop?: CSSProps;
};

export const responsiveStyle = ({
  wide,
  mobile,
  table,
  desktop,
}: ResponsiveStyle): StyleRule => {
  const { '@media': _, ...wideStyle } = (wide ?? {}) as any;

  return {
    ...wideStyle,
    ...(mobile || table || desktop
      ? {
          '@media': {
            ...mediaQuery.mobile(mobile ?? {}),
            ...mediaQuery.table(table ?? {}),
            ...mediaQuery.desktop(desktop ?? {}),
          },
        }
      : {}),
  };
};
