'use client';

import { usePost } from '@/src/stores/Post/usePost';

import { Box } from '../../atoms/Box';
import { PopularHeader } from '../../organisms/Header';
import { PostCardRecent, PostCardSkeleton } from '../../organisms/PostCard';
import * as styles from './recentPostPage.css';
import { useRecentPost } from './useRecentPost';

export const RecentPostPage = () => {
  const { isActive, setIsActive } = usePost();
  const { tree, isLoading } = useRecentPost();

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
          {isLoading ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : (
            tree &&
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
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
