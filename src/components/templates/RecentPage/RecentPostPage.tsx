'use client';

import { useEffect, useState } from 'react';
import { DirectoryTreeProps } from '@/src/utils/fs';

import { Box } from '../../atoms/Box';
import { PopularHeader } from '../../organisms/Header';
import { PostCardRecent } from '../../organisms/PostCard';
import * as styles from './recentPostPage.css';

export const RecentPostPage = () => {
  const [isActive, setIsActive] = useState<'row' | 'column'>('row');
  const [tree, setTree] = useState<DirectoryTreeProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/post/getRecentPost`).then(res =>
        res.json(),
      );

      console.log(res.tree);

      if (!res.success) {
        console.error('Failed to Get Recent Post');
        return;
      }
      setTree(res.tree);
    };

    fetchData();
  }, []);

  return (
    <Box
      height="full"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
    >
      <PopularHeader isActive={isActive} setIsActive={setIsActive} />
      <Box
        display="flex"
        height="full"
        paddingTop={isActive === 'row' ? '6' : '1'}
        paddingBottom="6"
        paddingX={isActive === 'row' ? '2' : '6'}
        justifyContent="center"
      >
        <Box className={styles.cardContainer({ direction: isActive })}>
          {tree &&
            tree.map((item, idx) => (
              <Box key={idx} position="relative">
                <PostCardRecent
                  variant="card"
                  path={item.path}
                  name={item.name.replaceAll('.md', '')}
                  userName={item.userName}
                  thumbnail={item.thumbnail ?? ''}
                  subTitle={item.subTitle}
                  date={item.date}
                  direction={isActive}
                />
              </Box>
            ))}
          {/* 추후 로딩시 스켈레톤 추가 */}
          {/* TODO: 추후 패치 loading을 이용해서 skeleton 삽입 */}
          {/* <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton /> */}
          {/* <PostCardSkeleton /> */}
        </Box>
      </Box>
    </Box>
  );
};
