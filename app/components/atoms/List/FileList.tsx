import { Box } from '../Box';
import * as styles from './fileList.css';
import { FileListItem } from './FileListItem';

export const FileList = () => {
  return (
    <Box className={styles.root}>
      <Box as="ul" width="full" className={styles.ul}>
        <FileListItem
          size="lg"
          variant="folder"
          isOpened={true}
          isActive={false}
          subdirectory={
            <>
              <FileListItem
                size="lg"
                variant="folder"
                isOpened={true}
                subdirectory={
                  <>
                    <FileListItem size="lg" variant="file" isOpened={false}>
                      뭐시기 글
                    </FileListItem>
                  </>
                }
              >
                Next.js
              </FileListItem>
              <FileListItem
                size="lg"
                variant="folder"
                isOpened={false}
                isActive={false}
              >
                Typescript
              </FileListItem>
              <FileListItem
                size="lg"
                variant="file"
                isOpened={false}
                isActive={false}
              >
                FileName
              </FileListItem>
            </>
          }
        >
          프론트
        </FileListItem>
        <FileListItem
          size="lg"
          variant="folder"
          isOpened={false}
          isActive={false}
        >
          백엔드
        </FileListItem>
      </Box>
    </Box>
  );
};
