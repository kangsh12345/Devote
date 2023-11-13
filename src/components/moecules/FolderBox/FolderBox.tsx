'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TreeProps } from '@/src/utils/fs';
import filePlus from '@phosphor-icons/core/duotone/file-plus-duotone.svg';
import folderPlus from '@phosphor-icons/core/duotone/folder-plus-duotone.svg';
import { Plus } from '@phosphor-icons/react';

import { Box } from '../../atoms/Box';
import { Button, IconButton } from '../../atoms/Button';
import { FileList, FolderListItem } from '../../atoms/List';
import { CreateInputModal } from '../../organisms/CreateInputModal';
import * as styles from './folderBox.css';

export interface FolderBoxProps {
  own?: 'my' | 'other';
}

export const FolderBox = ({ own = 'my' }: FolderBoxProps) => {
  const router = useRouter();
  const query = useParams();
  const { data: session, status, update } = useSession();

  const [mainOpen, setMainOpen] = useState(true);
  const [createRootFolderOpen, setCreateRootFolderOpen] = useState(false);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [createFileOpen, setCreateFileOpen] = useState(false);
  const [directory, setDirectory] = useState('');
  const [file, setFile] = useState('');
  const [rootDirectory, setRootDirectory] = useState('');
  const [tree, setTree] = useState<TreeProps>();
  const [inputError, setInputError] = useState('');

  const queryId = decodeURIComponent(decodeURIComponent(query.id));
  const querySlug = decodeURIComponent(decodeURIComponent(query.slug));

  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;

  const currentDirectory =
    query.id && queryId === session?.user.dirName && query.slug
      ? `/${querySlug}/...`
      : '/';

  useEffect(() => {
    if (session?.user.dirName) {
      fetch('/api/post/getAllDirectory')
        .then(res => res.json())
        .then(data => {
          data.message === 'success' ? setTree(data.tree) : '';
        });
    }
  }, [session]);

  const handleCreateRootDirectory = async (
    type: 'rootFolder' | 'folder' | 'file',
  ) => {
    if (inputError) {
      return;
    }
    if (
      type === 'rootFolder'
        ? rootDirectory === ''
        : type === 'file'
        ? file === ''
        : directory === ''
    ) {
      setInputError('이름을 입력해주세요');
      return;
    }
    if (
      type === 'rootFolder'
        ? regex.test(rootDirectory) || rootDirectory.length > 24
        : type === 'file'
        ? regex.test(file) || file.length > 24
        : regex.test(directory) || directory.length > 24
    ) {
      setInputError('올바른 이름을 입력해주세요.');
      return;
    }
    if (session) {
      if (type === 'rootFolder') {
        const res = await fetch(`/api/post/rootDirectoryCheck`, {
          method: 'POST',
          body: JSON.stringify({
            dirName: rootDirectory.trim(),
          }),
        }).then(res => res.json());

        console.log(res);

        if (!res.success) {
          setInputError(res.message);
          return;
        }
      }

      const dirName =
        type === 'rootFolder'
          ? rootDirectory.trim()
          : !query.id || queryId !== session.user.dirName
          ? session.user.dirName +
            '/' +
            (type === 'folder' ? directory.trim() : file.trim())
          : queryId +
            '/' +
            (query.slug ? querySlug + '/' : '') +
            (type === 'folder' ? directory.trim() : file.trim());

      try {
        await fetch(`/api/post/createDirectory`, {
          method: 'POST',
          body: JSON.stringify({
            id: session.user.id,
            dirName: dirName,
            type: type,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (
              type === 'rootFolder' &&
              data.message === 'success' &&
              status === 'authenticated'
            ) {
              update({ user: { dirName: rootDirectory } });
              setCreateRootFolderOpen(false);
              setRootDirectory('');
              router.refresh();
            }

            if (data.message === 'exist') {
              setInputError(
                '동일 경로에 같은 이름의 폴더/파일을 생성할 수 없습니다.',
              );
            }
            if (data.message === 'valid false') {
              setInputError('올바른 이름을 입력해주세요.');
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box className={styles.root({})}>
      {session && session.user.dirName ? (
        mainOpen ? (
          <>
            <Box className={styles.header({})}>
              <Box onClick={() => setMainOpen(false)}>
                <FolderListItem size="lg" isOpened={true}>
                  {session.user.dirName}
                </FolderListItem>
              </Box>
              {own === 'my' ? (
                <Box className={styles.addBox({})}>
                  <Box
                    display="flex"
                    width="full"
                    onClick={() => setCreateFileOpen(true)}
                  >
                    <IconButton
                      size="md"
                      variant="outline"
                      icon={<Image src={filePlus} alt="File Add Icon" fill />}
                    />
                  </Box>
                  <Box
                    display="flex"
                    width="full"
                    onClick={() => setCreateFolderOpen(true)}
                  >
                    <IconButton
                      size="md"
                      variant="outline"
                      icon={
                        <Image src={folderPlus} alt="Folder Add Icon" fill />
                      }
                    />
                  </Box>
                  {createFolderOpen && (
                    <CreateInputModal
                      title="폴더 생성"
                      setOpen={setCreateFolderOpen}
                      setInput={setDirectory}
                      handle={() => handleCreateRootDirectory('folder')}
                      inputLabel="create folder"
                      placeholder={currentDirectory}
                      value={directory}
                      inputError={inputError}
                      setInputError={setInputError}
                    />
                  )}
                  {createFileOpen && (
                    <CreateInputModal
                      title="파일 생성"
                      setOpen={setCreateFileOpen}
                      setInput={setFile}
                      handle={() => handleCreateRootDirectory('file')}
                      inputLabel="create file"
                      placeholder={currentDirectory}
                      value={file}
                      inputError={inputError}
                      setInputError={setInputError}
                    />
                  )}
                </Box>
              ) : (
                <Box />
              )}
            </Box>
            {tree && tree.children.length != 0 ? (
              <FileList tree={tree} />
            ) : (
              <Box className={styles.emptyBox({})}>비어있음</Box>
            )}
          </>
        ) : (
          <Box onClick={() => setMainOpen(true)}>
            <FolderListItem size="lg" isOpened={false}>
              {session.user.dirName}
            </FolderListItem>
          </Box>
        )
      ) : (
        <Box paddingY="1">
          <Box
            onClick={() => {
              session
                ? setCreateRootFolderOpen(true)
                : router.push('/auth/signin');
            }}
          >
            <Button
              size="md"
              variant="outline"
              radius="md"
              color="brand"
              leftIcon={<Plus weight="bold" />}
            >
              개인 폴더 생성
            </Button>
          </Box>
          {createRootFolderOpen && (
            <CreateInputModal
              title="개인 폴더 생성"
              setOpen={setCreateRootFolderOpen}
              setInput={setRootDirectory}
              handle={() => handleCreateRootDirectory('rootFolder')}
              inputLabel="create root folder"
              placeholder="폴더 이름을 입력해주세요."
              value={rootDirectory}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
