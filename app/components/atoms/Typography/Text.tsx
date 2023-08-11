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

export const Text = ({
  as = 'span',
  children,
  size,
  weight,
  color,
}: TextProps) => {
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
