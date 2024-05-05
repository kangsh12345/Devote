---
name: '강승헌'
title: '아토믹 디자인 Atoms 단계'
date: '2024-05-05 20:52:47'
---
![image.png](https://firebasestorage.googleapis.com/v0/b/devote-2cce5.appspot.com/o/images%2Ff6f33170-f561-40aa-ae37-6991557541f9.png?alt=media&token=5e3fde2c-2e8f-4bd7-a7fc-9d1ae49438f2)

**"차가우면서 따뜻한 vanilla-extract의 품 속"**

***
# 아토믹 디자인 구조
`
Foundation < Atoms < Molecules < Organisms < Templates
`
>
이번엔 figma로 제작한 Atoms에 대한 부분을 vanilla-extract를 이용하여 제작

![](https://velog.velcdn.com/images/kangsh12345/post/71e8f505-4860-436c-91a9-ddcee219a2fe/image.png)


***
# Atoms

## 컴포넌트 제작

![](https://velog.velcdn.com/images/kangsh12345/post/004753f1-5f0d-4cca-b091-085a237c20f7/image.png)

모든 컴포넌트의 베이스는 Box를 이용하여 잡아줌


### Box.tsx
```javascript
import * as React from 'react';
import { Atoms, atoms, sprinkles } from '@/app/css';
import clsx, { ClassValue } from 'clsx';

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  'as' | 'className' | 'color' | 'height' | 'width'
>;

type Props = Atoms &
  HTMLProperties & {
    as?: React.ElementType;
    className?: ClassValue;
  };

export const Box = React.forwardRef<HTMLElement, Props>(
  ({ as = 'div', className, ...props }: Props, ref) => {
    const atomProps: Record<string, unknown> = {};
    const nativeProps: Record<string, unknown> = {};

    for (const key in props) {
      if (sprinkles.properties.has(key as keyof Omit<Atoms, 'reset'>)) {
        atomProps[key] = props[key as keyof typeof props];
      } else {
        nativeProps[key] = props[key as keyof typeof props];
      }
    }

    const atomicClasses = atoms({
      reset: typeof as === 'string' ? (as as Atoms['reset']) : 'div',
      ...atomProps,
    });

    return React.createElement(as, {
      className: clsx(atomicClasses, className),
      ...nativeProps,
      ref,
    });
  },
);

export type BoxProps = Parameters<typeof Box>[0];

Box.displayName = 'Box';
```
> 이전에 만든 sprinkles - atoms (tokens를 이용해 만든 theme)를 props로 전달하여 css 적용하도록하며 as를 통해 태그를 정하는 형태로 사용

<br>

`Box를 근간으로 컴포넌트 제작`

### 예) ListToggle

![](https://velog.velcdn.com/images/kangsh12345/post/25c3eff9-9d9a-4c99-8d55-5bf96d1fd11d/image.png)

```javascript
// ListToggle.tsx
import { ReactElement } from 'react';

import { Box } from '../Box';
import * as styles from './listToggle.css';

export interface ListToggleProps {
  size?: 'lg' | 'md' | 'sm';
  color?: 'primary' | 'secondary';
  isActive?: boolean;
  icon: ReactElement;
}

export const ListToggle = ({
  size = 'md',
  color = 'primary',
  isActive = false,
  icon,
}: ListToggleProps) => {
  return (
    <Box className={styles.root({ size: size, isActive, color: color })}>
      <Box className={styles.IconWrapper({ size: size, isActive })}>{icon}</Box>
    </Box>
  );
};





// listToggle.css.ts
import { atoms, vars } from '@/app/css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: [
    atoms({
      borderRadius: 'md',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    }),
  ],
  variants: {
    size: {
      sm: atoms({ width: '7', height: '7' }),
      md: atoms({ width: '8', height: '8' }),
      lg: atoms({ width: '9', height: '9' }),
    },
    color: {
      primary: {},
      secondary: {},
    },
    isActive: {
      true: {},
      false: atoms({
        backgroundColor: {
          base: 'backgroundBase',
          hover: 'opacityBlack100',
        },
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        color: 'primary',
        isActive: true,
      },
      style: [
        atoms({
          backgroundColor: {
            base: 'opacityBlack100',
            hover: 'opacityBlack200',
          },
        }),
      ],
    },
    {
      variants: {
        color: 'secondary',
        isActive: true,
      },
      style: [
        atoms({
          backgroundColor: {
            base: 'opacityBlack200',
            hover: 'opacityBlack300',
          },
        }),
      ],
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
      sm: atoms({ width: '5', height: '5' }),
      md: atoms({ width: '6', height: '6' }),
      lg: atoms({ width: '7', height: '7' }),
    },
    isActive: {
      true: style({
        filter: vars.colors.filterTextPrimary,
      }),
      false: style({
        filter: vars.colors.filterTextSecondary,
      }),
    },
  },
});
```
<br>

vanilla-extract의 recipe를 사용

>
**recipe:** 런타임 또는 파일에서 정적으로 사용할 수 있는 상황에 따라 스타일을 변형시킬 수 있는 함수를 만듦
>
`.css.ts의 확장자를 사용`


recipe안에는 
1) **base** : 공통적으로 적용시킬 스타일
2) **variants** : 상황에 따라 적용시킬 스타일
3) **compoundVariants** : 여러 variants를 조합하여 공통된 상황에 스타일 설정을 적용
4) **defaultVariants** : fallback으로 사용할 variants 설정

<br>

>위에 코드를 예시로 들어 설명하자면

```javascript
// ListToggle.tsx
import * as styles from './listToggle.css.ts
...
...
    <Box className={styles.root({ size: size, isActive, color: color })}>
		...
    </Box>
```

위 코드를 살펴 볼 때 .css.ts에서 recipe로 된 root 함수를 가져와 size, isActive, color의 props를 전달하고 있음

이렇게 받은 props를 이용하여
```javascript
// 공통적으로 borderRadius의 md에 해당하는 스타일 외 ... 를 적용
  base: [
    atoms({
      borderRadius: 'md',
	  ...
    }),
  ],
```

```javascript
// props에 해당하는 값이 변경됐을 때의 스타일을 다음처럼 적용
  variants: {
    size: {
      sm: atoms({ width: '7', height: '7' }),
      md: atoms({ width: '8', height: '8' }),
      lg: atoms({ width: '9', height: '9' }),
    },
    color: {
      primary: {},
      secondary: {},
    },
    isActive: {
      true: {},
      false: atoms({
        backgroundColor: {
          base: 'backgroundBase',
          hover: 'opacityBlack100',
        },
      }),
    },
  },
```

```javascript
// 위의 variants 상황을 조합하여 성립했을 때 스타일 적용
  compoundVariants: [
    // color가 primary며 isActive가  true일 때 하단의 style을 적용
    {
      variants: {
        color: 'primary',
        isActive: true,
      },
      style: [
        atoms({
          backgroundColor: {
            base: 'opacityBlack100',
            hover: 'opacityBlack200',
          },
        }),
      ],
    },
    // color가 secondary며 isActive가  true일 때 하단의 style을 적용
    {
      variants: {
        color: 'secondary',
        isActive: true,
      },
      style: [
        atoms({
          backgroundColor: {
            base: 'opacityBlack200',
            hover: 'opacityBlack300',
          },
        }),
      ],
    },
  ],
```

<br>

>
위 코드에 사용된 
```javascript
atoms({
  backgroundColor: {
    base: 'opacityBlack100',
    hover: 'opacityBlack200',
  },
```
`같은 경우는 sprinkles의 defineProperties를 사용`
>
기존 : backgroundColor: 'opacityBlack100'
hover 시 : backgroundColor: 'opacityBlack200'
>
```javascript
//sprinkles.css.ts
...
const selectorProperties = defineProperties({
  conditions: {
    base: {},
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
    hover: { selector: '&:hover' },
    disabled: { selector: '&:disabled' },
  },
  defaultCondition: 'base',
  properties: {
    backgroundColor: vars.colors,
    borderColor: vars.colors,
    boxShadow: vars.shadows,
    color: vars.colors,
    outlineColor: vars.colors,
  },
});
```

<br>

### ListToggle 동작
![](https://velog.velcdn.com/images/kangsh12345/post/0509c5d2-8345-478f-99a3-192295becfda/image.gif)

<br>

***
## vanilla-extract 디자인 중 막혔던 부분

<br>

### 아이콘 색상변경
컴포넌트를 만들며 next13의 이미지 안에 svg 기반의 @phosphor-icons 아이콘을 사용하는 color을 이용하여 색상을 변경하는게 동작하지 않음

>
css-color-filter-generator: https://angel-rs.github.io/css-color-filter-generator/
>
next Image 안에 svg 파일을 넣을때 그 색상을 변경하고 싶을때 filter: ''으로 변경해야 바뀜
>
svg태그로 나와있는 건 svg안의 색상을 fill을 변경하면되지만 img태그로 나와있는건 이걸로 안바뀌어 filter로 바뀌어야함
>
`단점) 복잡한 SVG 이미지에 여러 필터를 사용하면 성능에 큰 부정적인 영향을 미친다는 점`

하여 위에서 살펴본 ListToggle 컴포넌트에서 또한
```javascript
// .css.ts
    isActive: {
      true: style({
        filter: vars.colors.filterTextPrimary,
      }),
      false: style({
        filter: vars.colors.filterTextSecondary,
      }),
    },
      
      
      
// tokens 값
...
light: {
    filterTextPrimary:
      'brightness(0) saturate(100%) invert(3%) sepia(33%) saturate(2108%) hue-rotate(205deg) brightness(100%) contrast(86%)',
    filterTextSecondary:
      'brightness(0) saturate(100%) invert(51%) sepia(31%) saturate(275%) hue-rotate(176deg) brightness(91%) contrast(87%)',
 ...
```

다음과 같이 적용시킴

<br>
<br>

### 적용 스타일 하단을 selector을 이용한 css 적용
vanilla-extract의 selector 적용하는 법은 크게 두가지로 나뉨

>
1) 본인에게 적용
2) 부모 하단의 자식에게 적용



1)
```javascript
export const switcher = [
  style({
    selectors: {
      ':hover&': { transform: 'translateY(8px)' },
    },
  }),
  ...
];
```
다음과 같이 vanilla-extract의 style의 selectors를 이용하여 적용하면 되는데 ':hover&'와 같이 &(자신)에게 적용되는 css만 적용가능

(하위 요소에 ex. 'div > img'같이 자신 하단의 스타일을 주기 위해서는 2번 사용)

<br>

2) 
```javascript
export const switcher = [
  style({
    selectors: {
      ':hover&': { transform: 'translateY(8px)' },
    },
  }),
  atoms({ flexShrink: 0, cursor: 'pointer' }),
];

globalStyle(`${switcher} > img`, {
  filter: vars.colors.filterTextPrimary,
});
```
부모의 style 함수를 이용하여 globalStyle을 통해 다음과 같이 자신 하단의 img에 스타일을 적용하는 식으로 사용할 수 있음


<br>

***
#### 추후 진행
이번에는 atoms에 대한 컴포넌트를 만들었으니 다음은 atoms를 기반으로의 Molecule 컴포넌트를 제작

>atoms 컴포넌트 test page
![](https://velog.velcdn.com/images/kangsh12345/post/466b5a53-b625-4bdc-9e7b-674e144bbae7/image.gif)

<br>

***
작성중인 github: https://github.com/kangsh12345/Devote
 
***

## 참고자료
#### vanilla-extract
https://vanilla-extract.style/

<br>

#### 아이콘 색상 변경
https://stackoverflow.com/questions/22252472/how-can-i-change-the-color-of-an-svg-element/53336754#53336754











