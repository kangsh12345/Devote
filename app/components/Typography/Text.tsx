import { ElementType, ReactNode } from 'react';

import { Box } from '../Box';
import * as styles from './typography.css';

interface TextStyleProps {
  size: keyof typeof styles;
  weight: keyof typeof styles.h1;
}

export interface TextProps extends TextStyleProps {
  as?: ElementType;
  children: ReactNode;
}

export default ({ as = 'span', children, size, weight }: TextProps) => {
  const typoClassName =
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

  return (
    <Box as={as} display="block" className={typoClassName}>
      {children}
    </Box>
  );
};
