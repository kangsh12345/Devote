'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TreeProps } from '@/src/utils/fs';

import { Box } from '../../atoms/Box';
import { Header } from '../../organisms/Header';
import { PostCard } from '../../organisms/PostCard';
import * as styles from './folderPostPage.css';

export const FolderPostPage = () => {
  const { data: session } = useSession();
  const [tree, setTree] = useState<TreeProps[]>();

  const path = usePathname();
  const pathArray = path.split('/');
  const pathBack = pathArray.slice(2, -1).join('/');

  useEffect(() => {
    // TODO: 추후 패치 loading을 이용해서 skeleton 삽입
    if (path.startsWith('/posts/')) {
      const fetchData = async () => {
        const res = await fetch(`/api/post/getDirectory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: path.replace('/posts/', ''),
          }),
        }).then(res => res.json());

        if (!res.success) {
          console.error('Failed to Get Directory');
          return;
        }

        console.log(res);

        setTree(res.tree);
      };

      fetchData();
    }
  }, [path]);

  return (
    <Box
      height="full"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
      onClick={() => console.log(pathBack)}
    >
      <Header type="folder" />
      <Box
        display="flex"
        height="full"
        // 여기 paiddng fimga랑 달라서 일단 나둠
        // paddingY="10"
        paddingY="6"
        paddingX="2"
        justifyContent="center"
      >
        <Box className={styles.cardContainer}>
          {pathArray.length > 3 && (
            <PostCard variant="folder" path={pathBack} name="../" />
          )}
          {tree &&
            tree.map((item, idx) => (
              <Box key={idx}>
                {item.type === 'folder' ? (
                  <PostCard
                    variant="folder"
                    path={item.path}
                    name={item.name}
                  />
                ) : (
                  <PostCard
                    variant={
                      session?.user.dirName === item.path.split('/', 1)[0]
                        ? 'cardInFolder'
                        : 'card'
                    }
                    path={item.path}
                    name={item.name}
                  />
                )}
              </Box>
            ))}

          {/* 추후 로딩시 스켈레톤 추가 */}
          {/* <PostCard skeleton />
          <PostCard skeleton />
          <PostCard skeleton /> */}
        </Box>
      </Box>
    </Box>
  );
};
