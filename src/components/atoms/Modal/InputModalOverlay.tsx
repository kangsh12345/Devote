import { Dispatch, SetStateAction } from 'react';

import { Box } from '../Box';
import * as styles from './modalOverlay.css';

export interface InputModalOverlayProps {
  visible?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: (value: string) => void;
  setInputError: Dispatch<SetStateAction<string>>;
}

export const InputModalOverlay = ({
  visible = false,
  setOpen,
  setInput,
  setInputError,
}: InputModalOverlayProps) => {
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
