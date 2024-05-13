'use client';

import { Box } from '../../../atoms/Box';
import { FileList, FolderListItem } from '../../../atoms/List';
import * as styles from './productionFolderBoxOther.css';
import { useProductionFolderBoxOther } from './useProductionFolderBoxOther';

export const ProductionFolderBoxOther = () => {
  const { mainOpen, setMainOpen, tree, dirName } =
    useProductionFolderBoxOther();

  return (
    <Box className={styles.root({})}>
      {dirName &&
        (mainOpen ? (
          <>
            <Box className={styles.header({})}>
              <FolderListItem
                size="lg"
                isOpened={true}
                setOpen={setMainOpen}
                dirName={dirName}
              >
                {dirName}
              </FolderListItem>
              <Box />
            </Box>
            {tree && tree.children.length != 0 ? (
              <FileList tree={tree} dirName={dirName} />
            ) : (
              <Box className={styles.emptyBox({})}>비어있음</Box>
            )}
          </>
        ) : (
          <FolderListItem
            size="lg"
            isOpened={false}
            setOpen={setMainOpen}
            dirName={dirName}
          >
            {dirName}
          </FolderListItem>
        ))}
    </Box>
  );
};
