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
  const iconSize =
    size === 'xl' ? '7' : size === 'lg' ? '6' : size === 'md' ? '5' : '4';

  return (
    <Box className={styles.root({ size })} width="fit">
      <Stack
        direction="horizontal"
        space={
          size === 'lg' || size === 'md' ? '2.5' : size === 'sm' ? '2' : '1.5'
        }
        align="center"
        justify="center"
      >
        {leftIcon && (
          <Box
            className={styles.iconWrapper}
            width={iconSize}
            height={iconSize}
          >
            {leftIcon}
          </Box>
        )}
        {children}
        {rightIcon && (
          <Box
            className={styles.iconWrapper}
            width={iconSize}
            height={iconSize}
          >
            {rightIcon}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
