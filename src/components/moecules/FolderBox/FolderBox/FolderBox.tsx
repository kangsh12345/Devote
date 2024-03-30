'use client';

import Image from 'next/image';
import filePlus from '@phosphor-icons/core/duotone/file-plus-duotone.svg';
import folderPlus from '@phosphor-icons/core/duotone/folder-plus-duotone.svg';
import { Plus } from '@phosphor-icons/react';

import { Box } from '../../../atoms/Box';
import { Button, IconButton } from '../../../atoms/Button';
import { FileList, FolderListItem } from '../../../atoms/List';
import { CreateInputModal } from '../../../organisms/CreateInputModal';
import * as styles from './folderBox.css';
import { useFolderBox } from './useFolderBox';

export const FolderBox = () => {
  const {
    mainOpen,
    setMainOpen,
    createRootFolderOpen,
    setCreateRootFolderOpen,
    createFolderOpen,
    setCreateFolderOpen,
    createFileOpen,
    setCreateFileOpen,
    tree,
    inputError,
    setInputError,
    directory,
    file,
    rootDirectory,
    router,
    session,
    currentDirectory,
    handleCreateRootDirectory,
    createDirectoryLoading,
  } = useFolderBox();

  return (
    <Box className={styles.root({})}>
      {session && session.user.dirName ? (
        mainOpen ? (
          <>
            <Box className={styles.header({})}>
              <FolderListItem
                size="lg"
                isOpened={true}
                setOpen={setMainOpen}
                dirName={session.user.dirName}
              >
                {session.user.dirName}
              </FolderListItem>
              <Box className={styles.addBox({})}>
                <Box
                  display="flex"
                  width="full"
                  onClick={() => setCreateFileOpen(true)}
                >
                  <IconButton
                    size="md"
                    variant="outline"
                    icon={
                      <Image
                        src={filePlus}
                        alt="File Add Icon"
                        fill
                        sizes="100%"
                      />
                    }
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
                      <Image
                        src={folderPlus}
                        alt="Folder Add Icon"
                        fill
                        sizes="100%"
                      />
                    }
                  />
                </Box>
                {createFolderOpen && (
                  <CreateInputModal
                    title="폴더 생성"
                    setOpen={setCreateFolderOpen}
                    setInput={directory.setValue}
                    handle={() => handleCreateRootDirectory('folder')}
                    inputLabel="create folder"
                    placeholder={currentDirectory}
                    value={directory.value}
                    inputError={inputError}
                    setInputError={setInputError}
                    loading={createDirectoryLoading}
                  />
                )}
                {createFileOpen && (
                  <CreateInputModal
                    title="파일 생성"
                    setOpen={setCreateFileOpen}
                    setInput={file.setValue}
                    handle={() => handleCreateRootDirectory('file')}
                    inputLabel="create file"
                    placeholder={currentDirectory}
                    value={file.value}
                    inputError={inputError}
                    setInputError={setInputError}
                    loading={createDirectoryLoading}
                  />
                )}
              </Box>
            </Box>
            {tree && tree.children.length != 0 ? (
              <FileList tree={tree} dirName={session?.user.dirName} />
            ) : (
              <Box className={styles.emptyBox({})}>비어있음</Box>
            )}
          </>
        ) : (
          <FolderListItem
            size="lg"
            isOpened={false}
            setOpen={setMainOpen}
            dirName={session.user.dirName}
          >
            {session.user.dirName}
          </FolderListItem>
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
              setInput={rootDirectory.setValue}
              handle={() => handleCreateRootDirectory('rootDirectory')}
              inputLabel="create root folder"
              placeholder="폴더 이름을 입력해주세요."
              value={rootDirectory.value}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
