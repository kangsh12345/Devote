import { responsiveStyle, vars } from '@/app/css';
import { style } from '@vanilla-extract/css';

const makeTypographyRules = (
  textDefinition: typeof vars.typographies.h1.bold,
) => {
  const {
    fontFamily: mobileFontFamily,
    fontWeight: mobileFontWeight,
    lineHeight: mobileLineHeight,
    fontSize: mobileFontSize,
    letterSpacing: mobileLetterSpacing,
    textDecoration: mobileTextDecoration,
  } = textDefinition.mobile;

  const {
    fontFamily: desktopFontFamily,
    fontWeight: desktopFontWeight,
    lineHeight: desktopLineHeight,
    fontSize: desktopFontSize,
    letterSpacing: desktopLetterSpacing,
    textDecoration: desktopTextDecoration,
  } = textDefinition.desktop;

  return {
    typo: style(
      responsiveStyle({
        desktop: {
          fontFamily: desktopFontFamily,
          fontWeight: desktopFontWeight,
          lineHeight: desktopLineHeight,
          fontSize: desktopFontSize,
          letterSpacing: desktopLetterSpacing,
          textDecoration: desktopTextDecoration,
        },
        mobile: {
          fontFamily: mobileFontFamily,
          fontWeight: mobileFontWeight,
          lineHeight: mobileLineHeight,
          fontSize: mobileFontSize,
          letterSpacing: mobileLetterSpacing,
          textDecoration: mobileTextDecoration,
        },
      }),
    ),
  };
};

export const hero = {
  bold: makeTypographyRules(vars.typographies.hero.bold),
  medium: makeTypographyRules(vars.typographies.hero.medium),
  regular: makeTypographyRules(vars.typographies.hero.regular),
};

export const h1 = {
  bold: makeTypographyRules(vars.typographies.h1.bold),
  medium: makeTypographyRules(vars.typographies.h1.medium),
  regular: makeTypographyRules(vars.typographies.h1.regular),
};
export const h2 = {
  bold: makeTypographyRules(vars.typographies.h2.bold),
  medium: makeTypographyRules(vars.typographies.h2.medium),
  regular: makeTypographyRules(vars.typographies.h2.regular),
};

export const h3 = {
  bold: makeTypographyRules(vars.typographies.h3.bold),
  medium: makeTypographyRules(vars.typographies.h3.medium),
  regular: makeTypographyRules(vars.typographies.h3.regular),
};

export const h4 = {
  bold: makeTypographyRules(vars.typographies.h4.bold),
  medium: makeTypographyRules(vars.typographies.h4.medium),
  regular: makeTypographyRules(vars.typographies.h4.regular),
};

export const body1 = {
  bold: makeTypographyRules(vars.typographies.body1.bold),
  medium: makeTypographyRules(vars.typographies.body1.medium),
  regular: makeTypographyRules(vars.typographies.body1.regular),
};

export const body2 = {
  bold: makeTypographyRules(vars.typographies.body2.bold),
  medium: makeTypographyRules(vars.typographies.body2.medium),
  regular: makeTypographyRules(vars.typographies.body2.regular),
};

export const caption = {
  bold: makeTypographyRules(vars.typographies.caption.bold),
  medium: makeTypographyRules(vars.typographies.caption.medium),
  regular: makeTypographyRules(vars.typographies.caption.regular),
};
