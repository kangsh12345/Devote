'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FolderNotch } from '@phosphor-icons/react';

import { Avatars } from '../../../atoms/Avatars';
import { Box } from '../../../atoms/Box';
import { Card } from '../../../atoms/Card';
import { Stack } from '../../../atoms/Stack';
import { CardHover } from '../../../moecules/CardHover';
import * as styles from '../PostCardSkeleton/postCard.css';

export type PostCardProps = {
  direction?: 'column' | 'row';
  variant: 'card' | 'folder';
  path: string;
  name: string;
  thumbnail?: string;
  subTitle?: string;
  date?: string;
  userName?: string;
};

export const PostCardRecent = (props: PostCardProps) => {
  const router = useRouter();

  const direction = props.direction === undefined ? 'row' : props.direction;
  const variant = props.variant;
  const mvPath =
    variant === 'folder'
      ? `/posts/${props.path}`
      : `/posts/${props.path?.replace(/\/([^\/]*)$/, '?title=$1')}`;

  const thumnail = props.thumbnail ?? '';

  const imageUrl = thumnail === '' ? '/image/NoPhoto.png' : thumnail;

  return (
    <Box
      onClick={() => {
        router.push(mvPath.replaceAll('.md', ''));
      }}
    >
      {direction === 'row' ? (
        <Box className={styles.rootRow({})}>
          <Box className={styles.wrapperRow({})}>
            <Box className={styles.cardWrapperRow({})}>
              {variant !== 'folder' ? (
                <CardHover
                  userName={props.userName ?? ''}
                  date={props.date ?? ''}
                  thumbnail={props.thumbnail ?? ''}
                  direction={direction}
                />
              ) : (
                <Box className={styles.folderIconWrapper}>
                  <FolderNotch
                    width="calc(100%/16*9)"
                    height="100%"
                    weight="duotone"
                  />
                </Box>
              )}
            </Box>
            <Box className={styles.contentWrapperRow({})}>
              <Box
                display="flex"
                justifyContent={variant !== 'folder' ? 'flex-start' : 'center'}
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
          {variant === 'card' ? (
            <>
              <Box
                display="flex"
                flexShrink={0}
                justifyContent="center"
                alignItems="center"
                height="24"
              >
                <Box width="23">
                  <Card variant="outline" direction={direction}>
                    <Image
                      src={imageUrl}
                      alt="thumbnail"
                      fill
                      sizes="100%"
                      objectFit="cover"
                    />
                  </Card>
                </Box>
              </Box>
              <Box className={styles.contentWrapperColmn}>
                <Box className={styles.mainContentColumn}>
                  <Stack space="6" direction="horizontal" align="center">
                    {variant === 'card' ? (
                      <Avatars size="md" text={props.userName} />
                    ) : (
                      ''
                    )}
                    <Box
                      display="flex"
                      alignItems="center"
                      fontWeight={700}
                      fontSize="3"
                      height="12"
                    >
                      {props.name}
                    </Box>
                  </Stack>
                  <Box className={styles.subtitleColumn({ variant })}>
                    {props.subTitle}
                  </Box>
                </Box>
                <Box
                  className={styles.subContentColumn({
                    hover: false,
                  })}
                >
                  <Box className={styles.dateColumn}>
                    {props.date?.replace('-', '년 ').replace('-', '월 ') + '일'}
                  </Box>
                  {/* <IconText
                    type="cardhover"
                    size="lg"
                    leftIcon={<Image src={star} alt="icon" fill sizes="100%" />}
                  >
                    <Box color="textSecondary">20</Box>
                  </IconText> */}
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box flexShrink={0}>
                <FolderNotch size={92} weight="duotone" />
              </Box>
              <Box className={styles.folderTitleColumn}>{props.name}</Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
