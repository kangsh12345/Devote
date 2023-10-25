import { PropsWithChildren } from 'react';
import { TreeProps } from '@/src/utils/fs';
import { CaretDown, CaretRight, File, Folder } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './fileListItem.css';

export interface FileListProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'folder' | 'file';
  isOpened?: boolean;
  isActive?: boolean;
  subdirectory?: TreeProps[];
}

export interface Space {
  space: '1' | '1.5' | '2' | '2.5';
  icon: number;
  box: '4' | '5' | '6' | '7';
}

export const FileListItem = ({
  size = 'md',
  variant = 'folder',
  isOpened = false,
  isActive = false,
  subdirectory,
  children,
}: PropsWithChildren<FileListProps>) => {
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
      backgroundColor={isActive ? 'opacityBlack50' : 'backgroundBase'}
      borderRadius="lg"
      cursor="pointer"
      className={styles.li}
    >
      <Stack space="0.5">
        <Box
          display="flex"
          alignItems="center"
          gap={sizes.space}
          color="textTertiary"
        >
          {variant === 'folder' ? (
            isOpened ? (
              <CaretDown weight="bold" size={sizes.icon} />
            ) : (
              <CaretRight weight="bold" size={sizes.icon} />
            )
          ) : (
            <Box width={sizes.box} />
          )}
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
            <Box color="textPrimary" fontWeight={500}>
              {children}
            </Box>
          </Stack>
        </Box>
        {subdirectory &&
          subdirectory.map((item, idx) => (
            <Box as="ul" key={idx}>
              <FileListItem
                size="lg"
                variant={item.type}
                isOpened={true}
                isActive={false}
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
