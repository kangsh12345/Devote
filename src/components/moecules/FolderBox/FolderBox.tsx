'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import filePlus from '@phosphor-icons/core/duotone/file-plus-duotone.svg';
import folderPlus from '@phosphor-icons/core/duotone/folder-plus-duotone.svg';
import { Plus } from '@phosphor-icons/react';

import { Box } from '../../atoms/Box';
import { Button, IconButton } from '../../atoms/Button';
import { FileList, FolderListItem } from '../../atoms/List';
import * as styles from './folderBox.css';

export interface FolderBoxProps {
  own?: 'my' | 'other';
}

export const FolderBox = ({ own = 'my' }: FolderBoxProps) => {
  const { data: session, status, update } = useSession();

  const empty = true;
  const [mainOpen, setMainOpen] = useState(true);

  const dirName = 'test0';

  const handleCreateRootDirectory = async () => {
    if (session) {
      try {
        const res = await fetch(`/api/post/createDirectory`, {
          method: 'POST',
          body: JSON.stringify({ id: session.user.id, dirName }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'exist' || data.message === 'success') {
              if (status === 'authenticated') {
                update({ user: { dirName } });
              }
            }
          });

        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box className={styles.root({})}>
      {session && !session.user.dirName ? (
        mainOpen ? (
          <>
            <Box className={styles.header({})}>
              <Box onClick={() => setMainOpen(false)}>
                <FolderListItem size="lg" isOpened={true}>
                  김아무개
                </FolderListItem>
              </Box>
              {own === 'my' ? (
                <Box className={styles.addBox({})}>
                  <IconButton
                    size="md"
                    variant="outline"
                    icon={<Image src={filePlus} alt="File Add Icon" fill />}
                  />
                  <IconButton
                    size="md"
                    variant="outline"
                    icon={<Image src={folderPlus} alt="Folder Add Icon" fill />}
                  />
                </Box>
              ) : (
                <Box />
              )}
            </Box>
            {empty ? (
              <Box className={styles.emptyBox({})}>비어있음</Box>
            ) : (
              <FileList />
            )}
          </>
        ) : (
          <Box onClick={() => setMainOpen(true)}>
            <FolderListItem size="lg" isOpened={false}>
              김아무개
            </FolderListItem>
          </Box>
        )
      ) : (
        <Box paddingY="1">
          <Box onClick={handleCreateRootDirectory}>
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
        </Box>
      )}
    </Box>
  );
};
