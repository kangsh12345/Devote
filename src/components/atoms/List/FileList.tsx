import { TreeProps } from '@/src/utils/fs';

import { Box } from '../Box';
import * as styles from './fileList.css';
import { FileListItem } from './FileListItem';

export interface FileListProps {
  tree: TreeProps;
}

export const FileList = ({ tree }: FileListProps) => {
  return (
    <Box className={styles.root}>
      <Box as="ul" width="full" className={styles.ul}>
        {tree.children.map((item, idx) => (
          <FileListItem
            size="lg"
            variant={item.type}
            isOpened={true}
            isActive={false}
            subdirectory={item.children}
            key={idx}
          >
            {item.name}
          </FileListItem>
        ))}
      </Box>
    </Box>
  );
};
