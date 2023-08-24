import { PropsWithChildren } from 'react';

import { Box } from '../Box';
import * as styles from './card.css';

export interface CardProps {
  variant?: 'elevated' | 'outline' | 'filled';
  type?: 'modal' | 'card';
}

export const Card = ({
  variant = 'outline',
  type = 'card',
  children,
}: PropsWithChildren<CardProps>) => {
  // TODO: 추후 안에 children 값 넣을 것에 대한 코드 추가
  return <Box className={styles.root({ variant, type })}>{children}</Box>;
};
