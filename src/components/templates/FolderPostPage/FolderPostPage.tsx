'use client';
import { usePost } from '@/src/stores/Post/usePost';

import { Box } from '../../atoms/Box';
import { Header } from '../../organisms/Header';
import {
  PostCard,
  PostCardBack,
  PostCardSkeleton,
} from '../../organisms/PostCard';
import * as styles from './folderPostPage.css';
import { useFolderPost } from './useFolderPost';

export const FolderPostPage = () => {
  const {
    tree,
    userName,
    hover,
    setHover,
    isOpen,
    setIsOpen,
    pathBack,
    own,
    path,
    pathArray,
    session,
    getDirectoryLoading,
  } = useFolderPost();

  const { isActive, setIsActive } = usePost();

  return (
    <Box
      height="full"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
    >
      <Header
        type={own ? 'myFolder' : 'folder'}
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
          {getDirectoryLoading ? (
            <>
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
              <PostCardSkeleton direction={isActive} />
            </>
          ) : (
            <>
              {pathArray.length > 3 && (
                <Box width={tree.length === 0 ? '96' : 'full'}>
                  <PostCardBack
                    variant="folder"
                    path={pathBack}
                    name="../"
                    direction={isActive}
                  />
                </Box>
              )}
              {tree &&
                tree.map((item, idx) => (
                  <Box
                    key={idx}
                    position="relative"
                    onMouseEnter={() => {
                      !isOpen && setHover(idx);
                    }}
                    onMouseLeave={() => {
                      !isOpen && setHover(-1);
                    }}
                  >
                    {item.type === 'folder' ? (
                      <PostCard
                        variant="folder"
                        path={item.path}
                        name={item.name}
                        direction={isActive}
                        own={own}
                        hover={hover}
                        idx={idx}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
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
                        own={own}
                        hover={hover}
                        idx={idx}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                      />
                    )}
                  </Box>
                ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
