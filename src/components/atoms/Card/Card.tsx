import { PropsWithChildren } from 'react';

import { Box } from '../Box';
import * as styles from './card.css';

export interface CardProps {
  variant?: 'elevated' | 'outline' | 'filled';
  type?: 'modal' | 'card';
  size?: 'md' | 'sm';
}

export const Card = ({
  variant = 'outline',
  type = 'card',
  size = 'md',
  children,
}: PropsWithChildren<CardProps>) => {
  return <Box className={styles.root({ variant, type, size })}>{children}</Box>;
};
