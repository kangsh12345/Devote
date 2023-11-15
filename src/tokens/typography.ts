export const fontFamilies = {
  pretendard: 'Pretendard',
} as const;

export const fontSize = {
  '0': '0.75rem',
  '1': '0.875rem',
  '2': '1rem',
  '3': '1.125rem',
  '4': '1.3125rem',
  '5': '1.375rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.375rem',
  '11': '3.125rem',
} as const;

export const fontWeights = {
  700: '700',
  500: '500',
  400: '400',
} as const;

export const lineHeights = {
  0: '130%',
  1: '150%',
} as const;

export const letterSpacing = {
  0: '-4%',
  1: '-2%',
} as const;

export const textDecoration = {
  none: 'none',
  underline: 'underline',
} as const;

export const typographies = {
  hero: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[0],
        fontSize: fontSize[11],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[0],
        fontSize: fontSize[9],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[0],
        fontSize: fontSize[11],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[0],
        fontSize: fontSize[9],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[0],
        fontSize: fontSize[11],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[0],
        fontSize: fontSize[9],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
  },
  h1: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[0],
        fontSize: fontSize[10],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[0],
        fontSize: fontSize[8],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[0],
        fontSize: fontSize[10],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[0],
        fontSize: fontSize[8],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[0],
        fontSize: fontSize[10],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[0],
        fontSize: fontSize[8],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
  },
  h2: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[0],
        fontSize: fontSize[7],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[0],
        fontSize: fontSize[6],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[0],
        fontSize: fontSize[7],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[0],
        fontSize: fontSize[6],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[0],
        fontSize: fontSize[7],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[0],
        fontSize: fontSize[6],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
  },
  h3: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[5],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[4],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[5],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[4],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[5],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[4],
        letterSpacing: letterSpacing[0],
        textDecoration: textDecoration.none,
      },
    },
  },
  h4: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[3],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[3],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[3],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[3],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[3],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[3],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
  },
  body1: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[2],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[2],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[2],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[2],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[2],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[2],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
  },
  body2: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[1],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[1],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[1],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[1],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[1],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[1],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
  },
  caption: {
    bold: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[0],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[700],
        lineHeight: lineHeights[1],
        fontSize: fontSize[0],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    medium: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[0],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[500],
        lineHeight: lineHeights[1],
        fontSize: fontSize[0],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
    regular: {
      desktop: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[0],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
      mobile: {
        fontFamily: fontFamilies.pretendard,
        fontWeight: fontWeights[400],
        lineHeight: lineHeights[1],
        fontSize: fontSize[0],
        letterSpacing: letterSpacing[1],
        textDecoration: textDecoration.none,
      },
    },
  },
} as const;
