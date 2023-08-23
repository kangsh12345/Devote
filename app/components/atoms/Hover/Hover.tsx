import { Box } from '../Box';
import * as styles from './hover.css';

export interface HoverProps {
  radius: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export const Hover = ({ radius }: HoverProps) => {
  return (
    <Box
      className={styles.root}
      position="absolute"
      width="full"
      height="full"
      borderRadius={radius}
      backgroundColor="opacityWhite300"
    />
  );
};
