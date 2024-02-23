'use client';
import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DirectoryTreeProps } from '@/src/utils/fs';
import { DotsThreeOutline } from '@phosphor-icons/react';

import { Box } from '../../atoms/Box';
import { Modal } from '../../moecules/Modal';
import { CreateInputModal } from '../../organisms/CreateInputModal';
import { Header } from '../../organisms/Header';
import { PostCard } from '../../organisms/PostCard';
import * as styles from './folderPostPage.css';

export const FolderPostPage = () => {
  const { data: session } = useSession();
  const [tree, setTree] = useState<DirectoryTreeProps[]>();
  const [userName, setUserName] = useState<string>('');
  const [hover, setHover] = useState<number>(-1);
  // TODO: isActive는 페이지가 바뀌어도 그대로여야하기때문에 밖으로 빼줘야함
  const [isActive, setIsActive] = useState<'row' | 'column'>('row');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modfiyOpen, setModifyOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  const pathName = usePathname();
  const router = useRouter();
  const path = decodeURIComponent(decodeURIComponent(pathName));
  const pathArray = path.split('/');
  const pathBack = pathArray.slice(2, -1).join('/');

  const param = useParams();
  const id = decodeURIComponent(decodeURIComponent(param.id));

  const own = param.id && id === session?.user.dirName ? true : false;

  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;

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

  const handleDeleteFolder = async (name: string, type: string) => {
    if (own) {
      try {
        const res = await fetch(`/api/post/remove`, {
          method: 'POST',
          body: JSON.stringify({
            path: `${path.replace('/posts/', '')}/${name}`,
            type,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => res.json());

        router.refresh();
        // TODO: tree 변경

        if (!res.success) {
          // toast error 메세지
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModifyFolder = (name: string, type: string) => {
    if (inputError) {
      return;
    }
    if (!folderName) {
      setInputError('이름을 입력해주세요');
      return;
    }

    if (regex.test(folderName) || folderName.length > 24) {
      setInputError('올바른 이름을 입력해주세요.');
      return;
    }

    const reqPath =
      `${path.replace('/posts/', '')}/${folderName}` +
      (type === 'file' ? '.md' : '');
    if (own && folderName !== name) {
      fetch(`/api/post/existCheck`, {
        method: 'POST',
        body: JSON.stringify({
          path: reqPath,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.exist) {
            setInputError('동일 경로 같은 파일 존재');
            return;
          }
        });
    }

    const currentPath = path.replace('/posts/', '') + '/' + name;

    if (own && !inputError && folderName) {
      try {
        fetch('/api/post/rename', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: currentPath,
            newPath: reqPath,
          }),
        }).then(res => {
          // if (res.ok) {
          //   return res.json();
          // } else {
          //   throw new Error(`Fetch Error`);
          // }
          res.json();
        });
        // .then(data => {
        // TODO: 추후 toast로 추가
        // alert(data.message);
        // });
      } catch (error) {
        alert(`request error: ${error}`);
      }
    }
  };

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
                {own && isActive === 'row' && hover === idx && (
                  <>
                    {isOpen && (
                      <Box className={styles.ulContainer}>
                        <Box className={styles.ulBox({ size: 'sm' })}>
                          <Box as="ul">
                            <Box
                              className={styles.liValue({})}
                              as="li"
                              fontSize="inherit"
                              onClick={() => {
                                setModifyOpen(true);
                                setFolderName(
                                  item.type === 'file'
                                    ? item.name.replace('.md', '')
                                    : item.name,
                                );
                              }}
                            >
                              <Box>수정</Box>
                            </Box>
                            {modfiyOpen && (
                              <CreateInputModal
                                title="폴더명 변경"
                                setOpen={setModifyOpen}
                                setInput={setFolderName}
                                handle={() =>
                                  handleModifyFolder(item.name, item.type)
                                }
                                inputLabel="modify folder"
                                placeholder="폴더명"
                                value={folderName}
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
                                  handleDeleteFolder(item.name, item.type)
                                }
                                leftButtonText="취소"
                                rightButtonText="삭제"
                                withCloseButton={false}
                              >
                                <Box as="span" textDecoration="underline">
                                  {item.name}
                                </Box>
                                을 삭제하시겠습니까?
                              </Modal>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )}
                    <Box
                      display={hover === idx ? 'flex' : 'none'}
                      position="absolute"
                      right="5"
                      top="-1.5"
                      zIndex="10"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <DotsThreeOutline size="24" weight="fill" />
                    </Box>
                  </>
                )}
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
