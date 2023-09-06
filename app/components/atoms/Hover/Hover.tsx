import { PropsWithChildren } from 'react';

import { Box } from '../Box';
import * as styles from './hover.css';

export interface HoverProps {
  radius: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  color?: 'black' | 'white';
  hover?: boolean;
}

export const Hover = ({
  radius,
  color = 'black',
  children,
}: PropsWithChildren<HoverProps>) => {
  return (
    <Box
      className={styles.root}
      position="absolute"
      width="full"
      height="full"
      borderRadius={radius}
      backgroundColor={color === 'white' ? 'opacityWhite300' : 'hoverImg'}
    >
      {children}
    </Box>
  );
};
