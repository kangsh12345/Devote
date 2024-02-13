'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DirectoryTreeProps } from '@/src/utils/fs';

import { Box } from '../../atoms/Box';
import { Header } from '../../organisms/Header';
import { PostCard } from '../../organisms/PostCard';
import * as styles from './folderPostPage.css';

export const FolderPostPage = () => {
  const { data: session } = useSession();
  const [tree, setTree] = useState<DirectoryTreeProps[]>();
  const [userName, setUserName] = useState<string>('');
  // TODO: isActive는 페이지가 바뀌어도 그대로여야하기때문에 밖으로 빼줘야함
  const [isActive, setIsActive] = useState<'row' | 'column'>('row');

  const pathName = usePathname();
  const path = decodeURIComponent(decodeURIComponent(pathName));
  const pathArray = path.split('/');
  const pathBack = pathArray.slice(2, -1).join('/');

  useEffect(() => {
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
        setTree(res.tree);
        setUserName(res.userName);
      };

      fetchData();
    }
  }, [path]);

  return (
    <Box
      height="full"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
    >
      <Header
        type="folder"
        isActive={isActive}
        setIsActive={setIsActive}
        path={path.replace('/posts/', '')}
        userName={userName}
      />
      <Box
        display="flex"
        height="full"
        paddingTop={isActive === 'row' ? '6' : '1'}
        paddingBottom="6"
        paddingX={isActive === 'row' ? '2' : '6'}
        justifyContent="center"
      >
        <Box className={styles.cardContainer({ direction: isActive })}>
          {pathArray.length > 3 && (
            <Box width={tree?.length === 0 ? '96' : 'full'}>
              <PostCard
                variant="folder"
                path={pathBack}
                name="../"
                direction={isActive}
              />
            </Box>
          )}
          {tree &&
            tree.map((item, idx) => (
              <Box key={idx}>
                {item.type === 'folder' ? (
                  <PostCard
                    variant="folder"
                    path={item.path}
                    name={item.name}
                    direction={isActive}
                  />
                ) : (
                  <PostCard
                    variant={
                      session?.user.dirName === item.path.split('/', 1)[0]
                        ? 'cardInFolder'
                        : 'card'
                    }
                    path={item.path}
                    name={item.name.replaceAll('.md', '')}
                    userName={item.userName}
                    thumbnail={item.thumbnail ?? ''}
                    subTitle={item.subTitle}
                    date={item.date}
                    direction={isActive}
                  />
                )}
              </Box>
            ))}
          {/* 추후 로딩시 스켈레톤 추가 */}
          {/* TODO: 추후 패치 loading을 이용해서 skeleton 삽입 */}
          {/* <PostCard skeleton />
          <PostCard skeleton />
          <PostCard skeleton />
          <PostCard skeleton />
          <PostCard skeleton />
          <PostCard skeleton /> */}
          {/* <PostCard skeleton /> */}
        </Box>
      </Box>
    </Box>
  );
};
