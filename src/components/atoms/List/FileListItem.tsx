'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { TreeProps } from '@/src/utils/fs';
import { CaretDown, CaretRight, File, Folder } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './fileListItem.css';

export interface FileListProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  path?: string;
  variant?: 'folder' | 'file';
  dirName: string;
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
  dirName,
  subdirectory,
  children,
}: PropsWithChildren<FileListProps>) => {
  const router = useRouter();
  const pathName = usePathname();

  const query = useSearchParams();
  const title = query.get('title');
  const param = useParams();

  const queryId = decodeURIComponent(decodeURIComponent(param.id));
  const querySlug = param.slug
    ? decodeURIComponent(decodeURIComponent(param.slug))
    : '';

  const filePath = `/posts/${path}`.replace(/\/([^\/]*)$/, '?title=$1');
  const folderPath = `/posts/${path}`;

  const currentFilePath =
    param.id && queryId === dirName
      ? `${queryId}${querySlug ? `/${querySlug}` : ''}${
          title ? `/${title}` : ''
        }`
      : '';

  const currentPath =
    param.id && queryId === dirName && param.slug && !title
      ? `${queryId}${querySlug ? `/${querySlug}` : ''}`
      : '';

  const comparePath = path.replace(dirName + '/', '').split('/');
  const compareCurrentPath = querySlug.split('/');

  const isOpen =
    param.id && queryId === dirName && param.slug
      ? comparePath.every((value, idx) => value === compareCurrentPath[idx])
      : false;

  const [subIsOpen, setSubIsOpen] = useState(false);

  useEffect(() => {
    setSubIsOpen(isOpen);
  }, [pathName, isOpen]);

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
        >
          <Box
            className={styles.fileListHover({
              active:
                variant === 'file'
                  ? currentFilePath === path
                  : currentPath === path,
            })}
            onClick={() => {
              setSubIsOpen(!subIsOpen);
              router.push(
                variant === 'file'
                  ? filePath.replaceAll('.md', '')
                  : folderPath,
              );
            }}
          />
          {variant === 'folder' ? (
            subIsOpen ? (
              <Box
                height={sizes.box}
                zIndex="20"
                onClick={() => setSubIsOpen(false)}
              >
                <CaretDown weight="bold" size={sizes.icon} />
              </Box>
            ) : (
              <Box
                height={sizes.box}
                zIndex="20"
                onClick={() => setSubIsOpen(true)}
              >
                <CaretRight weight="bold" size={sizes.icon} />
              </Box>
            )
          ) : (
            <Box width={sizes.box} display="flex" flexShrink={0} />
          )}
          <Box display="flex" width="full">
            <Stack direction="horizontal" align="center" space="1">
              <Box
                color={variant === 'folder' ? 'brandTertiary' : 'gray300'}
                display="flex"
                alignItems="center"
              >
                {variant === 'folder' ? (
                  <Folder size={sizes.icon} weight="fill" />
                ) : (
                  <File size={sizes.icon} weight="fill" />
                )}
              </Box>
              <Box
                color="textPrimary"
                fontWeight={500}
                className={styles.ellipsis}
              >
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
                variant={item.type}
                dirName={dirName}
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
