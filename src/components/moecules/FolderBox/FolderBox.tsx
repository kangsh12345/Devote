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

  const queryId = decodeURIComponent(decodeURIComponent(query.id));
  const querySlug = decodeURIComponent(decodeURIComponent(query.slug));

  const currentDirectory = queryId !== 'undefined' ? `/${querySlug}/...` : '/';

  useEffect(() => {
    if (session) {
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
    if (session) {
      if (type === 'rootFolder') {
        try {
          await fetch(`/api/post/createDirectory`, {
            method: 'POST',
            body: JSON.stringify({
              id: session.user.id,
              dirName: rootDirectory,
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.message === 'exist' || data.message === 'success') {
                if (status === 'authenticated') {
                  update({ user: { dirName: rootDirectory } });
                  setCreateRootFolderOpen(false);
                  setRootDirectory('');
                  router.refresh();
                }
              }
            });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <Box className={styles.root({})} onClick={() => console.log(tree)}>
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
                    />
                  )}
                </Box>
              ) : (
                <Box />
              )}
            </Box>
            {tree ? (
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
          <Box onClick={() => setCreateRootFolderOpen(true)}>
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
            />
          )}
        </Box>
      )}
    </Box>
  );
};
