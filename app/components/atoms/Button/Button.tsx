import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../Box';
import { Hover } from '../Hover';
import { Stack } from '../Stack';
import * as styles from './button.css';

export interface ButtonProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  variant?: 'solid' | 'outline';
  radius?: 'full' | 'md';
  color?: 'black' | 'brand' | 'gray' | 'blue' | 'red' | 'green' | 'orange';
  disabled?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

export const Button = ({
  size = 'md',
  variant = 'solid',
  radius = 'full',
  color = 'black',
  disabled = false,
  leftIcon,
  rightIcon,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const iconSize =
    size === 'lg' || size === 'md' ? '4' : size === 'sm' ? '3.5' : '3';

  return (
    <Box
      className={styles.root({ size, variant, radius, color, disabled })}
      width="fit"
    >
      <Hover radius={radius} />
      <Stack
        direction="horizontal"
        space={size === 'lg' || size === 'md' ? '2' : '1.5'}
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
