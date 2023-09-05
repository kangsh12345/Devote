import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './iconText.css';

export interface ButtonProps {
  type?: 'normal' | 'sidebarnav';
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
  isActive = true,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Box className={styles.root({ size, type, isActive })} width="fit">
      <Stack
        direction="horizontal"
        space={
          size === 'lg' || size === 'md' ? '2.5' : size === 'sm' ? '2' : '1.5'
        }
        align="center"
      >
        {leftIcon && (
          <Box className={styles.iconWrapper({ size, isActive })}>
            {leftIcon}
          </Box>
        )}
        <Box className={styles.textWrapper({ size })}>{children}</Box>
        {rightIcon && (
          <Box className={styles.iconWrapper({ size, isActive })}>
            {rightIcon}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
