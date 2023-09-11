import { Box } from '../Box';
import * as styles from './modalOverlay.css';

export interface ModalOverlayProps {
  visible?: boolean;
}

export const ModalOverlay = ({ visible = false }: ModalOverlayProps) => {
  return <Box className={styles.root({ visible })} />;
};
