'use client';

import { useState } from 'react';
import Image from 'next/image';
import filePlus from '@phosphor-icons/core/duotone/file-plus-duotone.svg';
import folderPlus from '@phosphor-icons/core/duotone/folder-plus-duotone.svg';

import { Box } from '../../atoms/Box';
import { IconButton } from '../../atoms/Button';
import { FileList, FolderListItem } from '../../atoms/List';
import * as styles from './folderBox.css';

export interface FolderBoxProps {
  own?: 'my' | 'other';
}

export const FolderBox = ({ own = 'my' }: FolderBoxProps) => {
  const empty = true;
  const [mainOpen, setMainOpen] = useState(true);

  return (
    <Box className={styles.root({})}>
      {mainOpen ? (
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
      )}
    </Box>
  );
};
