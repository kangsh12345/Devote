import { Dispatch, SetStateAction } from 'react';

import { Box } from '../Box';
import * as styles from './modalOverlay.css';

export interface ModalOverlayProps {
  visible?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalOverlay = ({
  visible = false,
  setOpen,
}: ModalOverlayProps) => {
  return (
    <Box className={styles.root({ visible })} onClick={() => setOpen(false)} />
  );
};
