---
name: '강승헌'
title: 'vanilla extract 디자인 테마 생'
date: '2024-05-05 20:50:50'
---
![image.png](https://firebasestorage.googleapis.com/v0/b/devote-2cce5.appspot.com/o/images%2F5a2ad049-fd1f-4e81-9593-d9cbd51cbf3f.png?alt=media&token=6a0839e5-787a-4d68-8ec8-50336de16f3c)

"무지성 구글링으로 탄생한 괴생명체"
***
## tokens
### colors
> 이전 토큰
```javascript
// tokens.json
...
  "light": {
    "brand": {
      "primary": "#9f7aea",
      "secondary": "#b794f4",
      "tertiary": "#d6bcfa",
      "background": "#faf5ff"
    },
  }
...
```
vanilla-extract에서 사용할 토큰으로 변환
```javascript
// app/tokens/color.ts
// base, light, dark로 나눠 base는 light, dark 상관없이 사용할 색상 지정
// light, dark 모드로 토큰 사용하기 위해 색상을 단계별로 나타내지 않고
// 이름: string 형태로 사용
export const colors = {
  ...
  light: {
    brandPrimary: '#9f7aea',
    brandSecondary: '#b794f4',
    brandTertiary: '#d6bcfa',
    brandBackground: '#faf5ff',
  }
  ...
}
```

### typographies
> 이전 토큰
```javascript
// tokens.json
...
  "desktop": {
        "hero-50": {
          "bold": {
            "fontFamily": "{fontFamilies.pretendard}",
            "fontWeight": "{fontWeights.pretendard-0}",
            "lineHeight": "{lineHeights.0}",
            "fontSize": "{fontSize.11}",
            "letterSpacing": "{letterSpacing.0}",
            "textDecoration": "{textDecoration.none}"
          },
          "medium": {
            "fontFamily": "{fontFamilies.pretendard}",
            "fontWeight": "{fontWeights.pretendard-1}",
            "lineHeight": "{lineHeights.0}",
            "fontSize": "{fontSize.11}",
            "letterSpacing": "{letterSpacing.0}",
            "textDecoration": "{textDecoration.none}"
          },
          "regular": {
            "fontFamily": "{fontFamilies.pretendard}",
            "fontWeight": "{fontWeights.pretendard-2}",
            "lineHeight": "{lineHeights.0}",
            "fontSize": "{fontSize.11}",
            "letterSpacing": "{letterSpacing.0}",
            "textDecoration": "{textDecoration.none}"
          }
        },
  }
...
```
vanilla-extract에서 사용할 토큰으로 변환
```javascript
// app/tokens/typography.ts
// breakpoint로 text 크기 조정하기 위해 desktop, mobile로 나눔
export const typographies = {
  ...
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
  ...
}
```

### border, radii, shadows, space
> 
```javascript
export const 토큰이름 = {
	이름: string
}
```
형태로 변경

![](https://velog.velcdn.com/images/kangsh12345/post/2e478ed7-45b8-4ce9-8317-236362e106f0/image.png)

</br>

***

## vanilla-extract 다크 테마

### vars.css.ts
```javascript
// app/css/vars.css.ts
...

// makeColorScheme를 통해 mode인자를 받아 light mode, dark mode 구현
const makeColorScheme = (mode: Mode = 'light') => {
  const colors = tokens.colors[mode];

  return {
    colors: {
      ...tokens.colors.base,
      brandPrimary: colors.brandPrimary,
      
      ...
      
      
const modeTokens = makeColorScheme('light');
const modeVars = createGlobalThemeContract(modeTokens, getVarName);
createGlobalTheme('[data-theme="light"]', modeVars, modeTokens);
createGlobalTheme('[data-theme="dark"]', modeVars, makeColorScheme('dark'));
  
...
```

<br>

### ThemeProvider
```javascript
// app/components/atoms/ThemeProvider/ThemeProvider.tsx
'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getModeColors } from '@/app/css';
import { Mode } from '@/app/tokens';
import { setElementVars } from '@vanilla-extract/dynamic';

type ThemeContextValue = {
  forcedMode?: Mode;
  mode: Mode;
  setMode(mode: Mode): void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const themeModeAttribute = 'data-theme';

export type ThemeProviderProps = {
  defaultMode?: Mode;
  element?: string | HTMLElement;
  forcedMode?: Mode;
};

export const ThemeProvider = ({
  children,
  defaultMode = 'light',
  element = ':root',
  forcedMode,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const value = useMemo(
    () => ({
      forcedMode,
      mode: mode,
      setMode,
    }),
    [forcedMode, mode],
  );

  const resolvedMode = forcedMode ?? mode;
  useEffect(() => {
    const root = getElement(element);
    if (root) {
      const enable = disableAnimation();
      root.setAttribute(themeModeAttribute, resolvedMode);
      setElementVars(root as HTMLElement, getModeColors(mode));
      enable();
    }
  }, [element, resolvedMode, mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('Must be used within ThemeProvider');
  return context;
};

const getElement = (selector: string | HTMLElement = ':root') => {
  if (typeof selector === 'string') return document.querySelector(selector);
  return selector;
};

const disableAnimation = () => {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1);
  };
};
```
<br>

### ThemeSwitcher
```javascript
// app/components/atoms/ThemeSwitcher/ThemeSwitcher.tsx
'use client';

import { useCallback } from 'react';
import { setThemeMode } from '@/app/utils/cookies';
import { useIsMounted } from '@/app/utils/isMounted';

import { useTheme } from '../ThemeProvider';

export const ThemeSwitcher = () => {
  const isMounted = useIsMounted();
  const { mode, setMode } = useTheme();

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
    setThemeMode(nextMode);
  }, [mode, setMode]);

  return (
    <div
      style={{ backgroundColor: '#ffe2e2', height: 100, width: 100 }}
      onClick={toggleMode}
    >
      {isMounted ? mode : 'light'}
    </div>
  );
};
```

### layout
```javascript
// app/layout.tsx
import { ThemeProvider } from '@/app/components/atoms/ThemeProvider';

import { getThemeMode } from './utils/cookies';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main>
          <ThemeProvider defaultMode={getThemeMode() ?? 'light'}>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}

```

***
## typography breakpoints 컴포넌트
### breakpoints
```javascript
// app/css/breakpoints.ts
export const breakpoints = {
  desktop: 1440,
  mobile: 0,
};

export type Breakpoint = keyof typeof breakpoints;

export const breakpointNames = Object.keys(breakpoints) as Breakpoint[];

```

### responsiveStyle
```javascript
// app/css/responsiveStyle.ts
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

```
<br>

### typography css
```javascript
// app/components/atoms/Typography/typography.css.ts
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
```
<br/>

### Text
```javascript
// app/components/atoms/Typography/Text.tsx
import { ElementType, ReactNode } from 'react';
import { Sprinkles, sprinkles } from '@/app/css';
import clsx from 'clsx';

import { Box } from '../Box';
import * as styles from './typography.css';

interface TextStyleProps {
  size: keyof typeof styles;
  weight: keyof typeof styles.h1;
  color?: Sprinkles['color'];
}

export interface TextProps extends TextStyleProps {
  as?: ElementType;
  children: ReactNode;
}

export const useTextStyle = ({ size, weight, color }: TextStyleProps) => {
  const typo =
    size === 'hero'
      ? styles.hero[weight].typo
      : size === 'h1'
      ? styles.h1[weight].typo
      : size === 'h2'
      ? styles.h2[weight].typo
      : size === 'h3'
      ? styles.h3[weight].typo
      : size === 'h4'
      ? styles.h4[weight].typo
      : size === 'body1'
      ? styles.body1[weight].typo
      : size === 'body2'
      ? styles.body2[weight].typo
      : size === 'caption'
      ? styles.caption[weight].typo
      : '';

  return clsx(typo, sprinkles({ color: color }));
};

export default ({ as = 'span', children, size, weight, color }: TextProps) => {
  return (
    <Box
      as={as}
      display="block"
      className={useTextStyle({ size, weight, color })}
    >
      {children}
    </Box>
  );
};
```

>
```javascript
<Text size="h1" weight="bold" color="brandPrimary">
  Text테스트
</Text>
```

***
## 임시 동작 테스트

### dark switcher
![](https://velog.velcdn.com/images/kangsh12345/post/9d4a7722-c938-420a-aaf1-fc7d41ee2744/image.gif)

### typography breakpoints
![](https://velog.velcdn.com/images/kangsh12345/post/b0b38f5d-4d37-4338-ad51-e235b2e71083/image.gif)

***
## atomic design
![](https://velog.velcdn.com/images/kangsh12345/post/be27ecb9-8336-4f80-8d2d-52a7ec78832f/image.png)
 추후 이전에 만든 figma design대로 코드 작성
 
***
작성중인 github: https://github.com/kangsh12345/Devote
 
***

## 참고 링크
Github
https://github.com/mirror-xyz/degen
https://github.com/vanilla-extract-css/vanilla-extract/tree/master

vanilla-extract 개념 
https://velog.io/@jay/css-in-ts-vanilla-extract

atomic design
https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/













