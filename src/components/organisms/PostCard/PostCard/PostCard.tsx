'use client';

import { Dispatch, RefObject, SetStateAction } from 'react';
import Image from 'next/image';
import { DotsThreeOutline, FolderNotch } from '@phosphor-icons/react';

import { Avatars } from '../../../atoms/Avatars';
import { Box } from '../../../atoms/Box';
import { Card } from '../../../atoms/Card';
import { Stack } from '../../../atoms/Stack';
import { CardHover } from '../../../moecules/CardHover';
import { Modal } from '../../../moecules/Modal';
import { CreateInputModal } from '../../CreateInputModal';
import * as styles from './postCard.css';
import { usePostCard } from './usePostCard';

export type PostCardProps = {
  direction?: 'column' | 'row';
  variant: 'card' | 'folder' | 'cardInFolder';
  path: string;
  name: string;
  thumbnail?: string;
  userName?: string;
  subTitle?: string;
  date?: string;
  own: boolean;
  hover: number;
  idx: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  domNodeRef: RefObject<HTMLDivElement>;
};

export const PostCard = (props: PostCardProps) => {
  const {
    modfiyOpen,
    setModifyOpen,
    deleteOpen,
    setDeleteOpen,
    inputError,
    setInputError,
    folderName,
    router,
    direction,
    variant,
    mvPath,
    imageUrl,
    handleDeleteFolder,
    handleModifyFolder,
    domNodeRef,
  } = usePostCard(props);

  return (
    <>
      {props.own && props.hover === props.idx && (
        <>
          {props.isOpen && (
            <Box className={styles.ulContainer({ direction })} ref={domNodeRef}>
              <Box className={styles.ulBox({ size: 'sm' })}>
                <Box as="ul">
                  <Box
                    className={styles.liValue({})}
                    as="li"
                    fontSize="inherit"
                    onClick={() => {
                      setModifyOpen(true);
                      folderName.setValue(
                        variant === 'card'
                          ? props.name.replace('.md', '')
                          : props.name,
                      );
                    }}
                  >
                    <Box>수정</Box>
                  </Box>
                  {modfiyOpen && (
                    <CreateInputModal
                      title="폴더명 변경"
                      setOpen={setModifyOpen}
                      setInput={folderName.setValue}
                      handle={() =>
                        handleModifyFolder(
                          props.name,
                          variant !== 'folder' ? 'file' : 'folder',
                        )
                      }
                      inputLabel="modify folder"
                      placeholder="폴더명"
                      value={folderName.value}
                      inputError={inputError}
                      setInputError={setInputError}
                    />
                  )}
                  <Box
                    className={styles.liValue({})}
                    as="li"
                    fontSize="inherit"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Box>삭제</Box>
                  </Box>
                  {deleteOpen && (
                    <Modal
                      type="right"
                      title="폴더 삭제"
                      setOpen={setDeleteOpen}
                      handle={() =>
                        handleDeleteFolder(
                          variant !== 'folder' ? 'file' : 'folder',
                        )
                      }
                      leftButtonText="취소"
                      rightButtonText="삭제"
                      withCloseButton={false}
                    >
                      <Box as="span" textDecoration="underline">
                        {props.name}
                      </Box>
                      을 삭제하시겠습니까?
                    </Modal>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          <Box
            display={props.hover === props.idx ? 'flex' : 'none'}
            position="absolute"
            // right="5"
            // top="-1.5"
            right={direction === 'row' ? '5' : '1'}
            top={direction === 'row' ? '-1.5' : '9'}
            zIndex="10"
            onClick={() => props.setIsOpen(!props.isOpen)}
          >
            <DotsThreeOutline size="24" weight="fill" />
          </Box>
        </>
      )}
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
                      hover: props.own ? props.hover === props.idx : false,
                    })}
                  >
                    <Box className={styles.dateColumn}>
                      {props.date?.replace('-', '년 ').replace('-', '월 ') +
                        '일'}
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
                <Box flexShrink={0} color="textPrimary">
                  <FolderNotch size={92} weight="duotone" />
                </Box>
                <Box className={styles.folderTitleColumn}>{props.name}</Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
