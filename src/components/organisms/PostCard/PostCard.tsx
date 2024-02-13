import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import star from '@phosphor-icons/core/fill/star-fill.svg';
import { FolderNotch } from '@phosphor-icons/react';

import { Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Card } from '../../atoms/Card';
import { Stack } from '../../atoms/Stack';
// import { IconText } from '../../atoms/Text';
import { CardHover } from '../../moecules/CardHover';
import * as styles from './postCard.css';

export type PostCardProps =
  | {
      direction?: 'column' | 'row';
      variant: 'card' | 'folder' | 'cardInFolder';
      path: string;
      name: string;
      thumbnail?: string;
      userName?: string;
      subTitle?: string;
      date?: string;
    }
  | { skeleton: true };
// 추후 skeleton driection 도 추가

export const PostCard = (props: PostCardProps) => {
  const router = useRouter();

  if ('skeleton' in props) {
    return (
      <Box className={styles.rootRow({})}>
        <Box className={styles.wrapperRow({})}>
          <Box className={styles.cardWrapperRow({})}>
            <Card skeleton />
          </Box>
          <Box className={styles.contentWrapperRow({})}>
            <Box
              display="flex"
              justifyContent="flex-start"
              height="6"
              width="36"
              borderRadius="md"
              className={styles.skeleton}
            />
            <Box height="16" borderRadius="md" className={styles.skeleton} />
          </Box>
        </Box>
      </Box>
    );
  }

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
          {variant === 'card' || variant === 'cardInFolder' ? (
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
                  <Stack space="3" direction="horizontal" align="center">
                    {variant === 'card' ? (
                      <Avatars size="lg" text={props.userName} />
                    ) : (
                      ''
                    )}
                    <Box
                      display="flex"
                      alignItems="center"
                      fontWeight={700}
                      fontSize="5"
                      height="12"
                    >
                      {/* 추후 before content /를 파일 위치 마다 추가 */}
                      {props.name}
                    </Box>
                  </Stack>
                  <Box className={styles.subtitleColumn({ variant })}>
                    {props.subTitle}
                  </Box>
                </Box>
                <Box className={styles.subContentColumn}>
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
