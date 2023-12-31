import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './iconText.css';

export interface ButtonProps {
  type?: 'normal' | 'sidebarnav' | 'cardhover';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  isActive?: boolean;
}

export const IconText = ({
  type = 'normal',
  size = 'md',
  leftIcon,
  rightIcon,
  isActive = false,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Box className={styles.root({ size, type, isActive })}>
      <Stack
        direction="horizontal"
        space={
          size === 'lg' || size === 'md' ? '2.5' : size === 'sm' ? '2' : '1.5'
        }
        align="center"
      >
        {leftIcon && (
          <Box className={styles.iconWrapper({ size, type, isActive })}>
            {leftIcon}
          </Box>
        )}
        <Box className={styles.textWrapper({ size })}>{children}</Box>
        {rightIcon && (
          <Box className={styles.iconWrapper({ size, type, isActive })}>
            {rightIcon}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
