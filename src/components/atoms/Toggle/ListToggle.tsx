import { ReactElement } from 'react';

import { Box } from '../Box';
import * as styles from './listToggle.css';

export interface ListToggleProps {
  size?: 'lg' | 'md' | 'sm';
  color?: 'primary' | 'secondary';
  isActive?: boolean;
  icon: ReactElement;
}

export const ListToggle = ({
  size = 'md',
  color = 'primary',
  isActive = false,
  icon,
}: ListToggleProps) => {
  return (
    <Box className={styles.root({ size: size, isActive, color: color })}>
      <Box className={styles.IconWrapper({ size: size, isActive })}>{icon}</Box>
    </Box>
  );
};
