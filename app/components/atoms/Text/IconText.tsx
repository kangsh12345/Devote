import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './iconText.css';

export interface ButtonProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
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
    size === 'lg' ? '7' : size === 'md' ? '6' : size === 'sm' ? '5' : '4';

  return (
    <Box className={styles.root({ size })} width="fit" color="textPrimary">
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
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={iconSize}
          >
            {leftIcon}
          </Box>
        )}
        {children}
        {rightIcon && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={iconSize}
          >
            {rightIcon}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
