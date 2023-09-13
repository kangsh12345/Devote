import { ReactNode } from 'react';

import { Box } from '../Box';
import * as styles from './card.css';

export type CardProps =
  | {
      variant?: 'elevated' | 'outline' | 'filled';
      type?: 'modal' | 'card';
      size?: 'md' | 'sm';
      children?: ReactNode;
    }
  | { skeleton: true };

export const Card = (props: CardProps) => {
  if ('skeleton' in props) {
    return <Box className={styles.skeleton({})} />;
  }
  const variant = props.variant === undefined ? 'outline' : props.variant;
  const type = props.type === undefined ? 'card' : props.type;
  const size = props.size === undefined ? 'md' : props.size;

  return (
    <Box
      className={styles.root({
        variant,
        type,
        size,
      })}
    >
      {props.children}
    </Box>
  );
};
