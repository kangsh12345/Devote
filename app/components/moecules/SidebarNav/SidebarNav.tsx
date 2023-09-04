import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../../atoms/Box';
import { IconText } from '../../atoms/Text';
import * as styles from './sidebarNav.css';

export interface SidebarNavProps {
  type?: 'main' | 'sub';
  size?: 'lg' | 'md' | 'sm';
  isActive?: boolean;
  icon: ReactElement;
}

export const SidebarNav = ({
  type = 'main',
  size = 'md',
  isActive = false,
  icon,
  children,
}: PropsWithChildren<SidebarNavProps>) => {
  return (
    <Box className={styles.root({ type, isActive, size })}>
      <IconText size={size} leftIcon={icon}>
        {children}
      </IconText>
    </Box>
  );
};
