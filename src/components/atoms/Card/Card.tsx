import { ReactNode } from 'react';

import { Box } from '../Box';
import * as styles from './card.css';

export type CardProps =
  | {
      variant?: 'elevated' | 'outline' | 'filled';
      type?: 'modal' | 'card';
      direction?: 'row' | 'column';
      children?: ReactNode;
    }
  | { skeleton: true };

export const Card = (props: CardProps) => {
  if ('skeleton' in props) {
    return <Box className={styles.skeleton({})} />;
  }
  const variant = props.variant === undefined ? 'outline' : props.variant;
  const type = props.type === undefined ? 'card' : props.type;
  const direction = props.direction === undefined ? 'row' : props.direction;

  return (
    <Box
      className={styles.root({
        variant,
        type,
        direction,
      })}
    >
      {props.children}
    </Box>
  );
};
