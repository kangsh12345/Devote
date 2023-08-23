import { ReactElement } from 'react';

import { Box } from '../Box';
import * as styles from './iconButton.css';

export interface IconButtonProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'normal' | 'outline';
  icon: ReactElement;
}

export const IconButton = ({
  size = 'md',
  variant = 'normal',
  icon,
}: IconButtonProps) => {
  return (
    <Box className={styles.root({ size: size, variant: variant })}>
      <Box className={styles.IconWrapper({ size: size, variant: variant })}>
        {icon}
      </Box>
    </Box>
  );
};
