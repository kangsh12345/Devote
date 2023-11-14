'use client';

import { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TreeProps } from '@/src/utils/fs';
import { CaretDown, CaretRight, File, Folder } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './fileListItem.css';

export interface FileListProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  path?: string;
  variant?: 'folder' | 'file';
  currentPath: string;
  subdirectory?: TreeProps[];
}

export interface Space {
  space: '1' | '1.5' | '2' | '2.5';
  icon: number;
  box: '4' | '5' | '6' | '7';
}

export const FileListItem = ({
  size = 'md',
  path = '',
  variant = 'folder',
  subdirectory,
  currentPath,
  children,
}: PropsWithChildren<FileListProps>) => {
  const [subIsOpen, setSubIsOpen] = useState(false);

  const router = useRouter();

  const sizes: Space =
    size === 'sm'
      ? { space: '1', icon: 16, box: '4' }
      : size === 'md'
      ? { space: '1.5', icon: 20, box: '5' }
      : size === 'lg'
      ? { space: '2', icon: 24, box: '6' }
      : { space: '2.5', icon: 28, box: '7' };

  return (
    <Box
      as="li"
      width="full"
      borderRadius="lg"
      cursor="pointer"
      className={styles.li}
    >
      <Stack space="0.75">
        <Box
          display="flex"
          alignItems="center"
          gap={sizes.space}
          color="textTertiary"
          onClick={() =>
            console.log(`currentPath=${currentPath}, path=${path}`)
          }
        >
          {currentPath === path && (
            <Box
              position="absolute"
              backgroundColor="opacityBlack50"
              left="0"
              width="57"
              height="6"
            />
          )}
          {variant === 'folder' ? (
            subIsOpen ? (
              <Box height={sizes.box} zIndex="100">
                <CaretDown
                  weight="bold"
                  size={sizes.icon}
                  onClick={() => setSubIsOpen(false)}
                />
              </Box>
            ) : (
              <Box height={sizes.box} zIndex="100">
                <CaretRight
                  weight="bold"
                  size={sizes.icon}
                  onClick={() => setSubIsOpen(true)}
                />
              </Box>
            )
          ) : (
            <Box width={sizes.box} display="flex" flexShrink={0} />
          )}
          <Box
            display="flex"
            width="full"
            onClick={() => router.push(`/posts/${path}`)}
          >
            <Stack direction="horizontal" align="center" space="1">
              <Box
                color={variant === 'folder' ? 'brandTertiary' : 'gray300'}
                display="flex"
                alignItems="center"
                onClick={() => router.push(`/posts/${path}`)}
              >
                {variant === 'folder' ? (
                  <Folder size={sizes.icon} weight="fill" />
                ) : (
                  <File size={sizes.icon} weight="fill" />
                )}
              </Box>
              <Box color="textPrimary" fontWeight={500}>
                {children}
              </Box>
            </Stack>
          </Box>
        </Box>
        {subIsOpen &&
          subdirectory &&
          subdirectory.map((item, idx) => (
            <Box as="ul" key={idx} paddingLeft="3">
              <FileListItem
                size="lg"
                path={item.path}
                currentPath={currentPath}
                variant={item.type}
                subdirectory={item.children}
              >
                {item.name}
              </FileListItem>
            </Box>
          ))}
      </Stack>
    </Box>
  );
};
