'use client';

import { Box } from '../../atoms/Box';
import { FilePostPage } from '../FilePostPage';
import { FolderPostPage } from '../FolderPostPage';
import { usePostSidePage } from './usePostSidePage';

export function PostSidePage() {
  const { title, own, currentFilePath } = usePostSidePage();

  return (
    <Box>
      {title ? (
        <FilePostPage title={title} own={own} path={currentFilePath} />
      ) : (
        <FolderPostPage own={own} />
      )}
    </Box>
  );
}
