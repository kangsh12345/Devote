'use client';

import { useRouter } from 'next/navigation';
// import star from '@phosphor-icons/core/fill/star-fill.svg';
import { FolderNotch } from '@phosphor-icons/react';

import { Box } from '../../../atoms/Box';
import * as styles from '../PostCardSkeleton/postCard.css';

export type PostCardProps = {
  direction?: 'column' | 'row';
  variant: 'card' | 'folder' | 'cardInFolder';
  path: string;
  name: string;
  thumbnail?: string;
  userName?: string;
  subTitle?: string;
  date?: string;
};

export const PostCardBack = (props: PostCardProps) => {
  const router = useRouter();

  const direction = props.direction === undefined ? 'row' : props.direction;
  const variant = props.variant;
  const mvPath =
    variant === 'folder'
      ? `/posts/${props.path}`
      : `/posts/${props.path?.replace(/\/([^\/]*)$/, '?title=$1')}`;

  return (
    <>
      <Box
        onClick={() => {
          router.push(mvPath.replaceAll('.md', ''));
        }}
      >
        {direction === 'row' ? (
          <Box className={styles.rootRow({})}>
            <Box className={styles.wrapperRow({})}>
              <Box className={styles.cardWrapperRow({})}>
                <Box className={styles.folderIconWrapper}>
                  <FolderNotch
                    width="calc(100%/16*9)"
                    height="100%"
                    weight="duotone"
                  />
                </Box>
              </Box>
              <Box className={styles.contentWrapperRow({})}>
                <Box
                  display="flex"
                  justifyContent={
                    variant !== 'folder' ? 'flex-start' : 'center'
                  }
                  fontSize={variant !== 'folder' ? '2' : '3'}
                  fontWeight={700}
                  lineHeight={1}
                  className={styles.overflowRow({ type: 'title' })}
                >
                  {props.name}
                </Box>
                {variant !== 'folder' ? (
                  <Box
                    fontSize="1"
                    lineHeight={1}
                    height="16"
                    className={styles.overflowRow({ type: 'subtitle' })}
                  >
                    {props.subTitle}
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className={styles.rootColumn({})}>
            <Box flexShrink={0}>
              <FolderNotch size={92} weight="duotone" />
            </Box>
            <Box className={styles.folderTitleColumn}>{props.name}</Box>
          </Box>
        )}
      </Box>
    </>
  );
};
