import { Dispatch, SetStateAction } from 'react';

import { Box } from '../../atoms/Box';
import { Sidebar } from '../../organisms/Sidebar';
import * as styles from './drawer.css';

export interface DrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Drawer = ({ isOpen, setIsOpen }: DrawerProps) => {
  return (
    <Box className={styles.root({ isOpen })}>
      <Box className={styles.overlay({})} onClick={() => setIsOpen(false)} />
      <Box className={styles.drawer({})}>
        <Sidebar
          type="drawer"
          isOpenDrawer={isOpen}
          setIsOpenDrawer={setIsOpen}
        />
      </Box>
    </Box>
  );
};
