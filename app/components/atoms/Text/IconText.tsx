import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './iconText.css';

export interface ButtonProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

export const IconText = ({
  size = 'md',
  leftIcon,
  rightIcon,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Box className={styles.root({ size })} width="fit">
      <Stack
        direction="horizontal"
        space={
          size === 'lg' || size === 'md' ? '2.5' : size === 'sm' ? '2' : '1.5'
        }
        align="center"
      >
        {leftIcon && (
          <Box className={styles.iconWrapper({ size })}>{leftIcon}</Box>
        )}
        {children}
        {rightIcon && (
          <Box className={styles.iconWrapper({ size })}>{rightIcon}</Box>
        )}
      </Stack>
    </Box>
  );
};
