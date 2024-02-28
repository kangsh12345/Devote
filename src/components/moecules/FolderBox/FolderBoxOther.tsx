'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TreeProps } from '@/src/utils/fs';

import { Box } from '../../atoms/Box';
import { FileList, FolderListItem } from '../../atoms/List';
import * as styles from './folderBox.css';

// export interface FolderBoxProps {
//   own: boolean;
// }

export const FolderBoxOther = () => {
  const pathName = usePathname();
  const path = decodeURIComponent(decodeURIComponent(pathName));
  const dirName = path.split('/')[2];

  const [mainOpen, setMainOpen] = useState(true);
  const [tree, setTree] = useState<TreeProps>();

  // TODO: 이거 참고해서 폴더 내 경로 tree 얻어오는 api 이어서 제작
  useEffect(() => {
    if (path.startsWith('/posts/')) {
      const fetchData = async () => {
        await fetch(`/api/post/getAllOtherDirectory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: path.split('/')[2],
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'success') {
              setTree(data.tree);
            }
          });
      };
      fetchData();
    }
  }, [path]);

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
