import { PropsWithChildren, ReactElement } from 'react';
import { Tokens } from '@/src/tokens';

import { Box } from '../Box';
import { Hover } from '../Hover';
import { Stack } from '../Stack';
import * as styles from './button.css';

export interface ButtonProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  width?: keyof Tokens['space'];
  variant?: 'solid' | 'outline';
  radius?: 'full' | 'md';
  color?: 'black' | 'brand' | 'gray' | 'blue' | 'red' | 'green' | 'orange';
  disabled?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  size = 'md',
  width = 'full',
  variant = 'solid',
  radius = 'full',
  color = 'black',
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Box
      className={styles.root({ size, variant, radius, color, disabled })}
      width={width}
      onClick={onClick}
    >
      <Hover radius={radius} color="white" />
      <Stack
        direction="horizontal"
        space={size === 'lg' || size === 'md' ? '2' : '1.5'}
      >
        {leftIcon && (
          <Box display="flex" justifyContent="center" alignItems="center">
            {leftIcon}
          </Box>
        )}
        {children}
        {rightIcon && (
          <Box display="flex" justifyContent="center" alignItems="center">
            {rightIcon}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
