import { Dispatch, SetStateAction } from 'react';

import { Box } from '../Box';
import * as styles from './modalOverlay.css';

export interface ModalOverlayProps {
  visible?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<string>>;
  setInputError: Dispatch<SetStateAction<string>>;
}

export const ModalOverlay = ({
  visible = false,
  setOpen,
  setInput,
  setInputError,
}: ModalOverlayProps) => {
  return (
    <Box
      className={styles.root({ visible })}
      onClick={() => {
        setOpen(false);
        setInput('');
        setInputError('');
      }}
    />
  );
};
