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
  desktop: makeMediaQuery('desktop'),
};

type ResponsiveStyle = {
  wide?: CSSProps;
  mobile?: CSSProps;
  desktop?: CSSProps;
};

export const responsiveStyle = ({
  wide,
  mobile,
  desktop,
}: ResponsiveStyle): StyleRule => {
  const { '@media': _, ...wideStyle } = (wide ?? {}) as any;

  return {
    ...wideStyle,
    ...(mobile || desktop
      ? {
          '@media': {
            ...mediaQuery.mobile(mobile ?? {}),
            ...mediaQuery.desktop(desktop ?? {}),
          },
        }
      : {}),
  };
};
