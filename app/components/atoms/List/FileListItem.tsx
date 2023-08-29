import { CaretDown, CaretRight, File, Folder } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';

export interface FileListProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'folder' | 'file';
  isOpened?: boolean;
  isActive?: boolean;
}

export interface Space {
  space: '1' | '1.5' | '2' | '2.5';
  icon: number;
}

export const FileListItem = ({
  size = 'md',
  variant = 'folder',
  isOpened = false,
  isActive = false,
}: FileListProps) => {
  const sizes: Space =
    size === 'sm'
      ? { space: '1', icon: 16 }
      : size === 'md'
      ? { space: '1.5', icon: 20 }
      : size === 'lg'
      ? { space: '2', icon: 24 }
      : { space: '2.5', icon: 28 };

  return (
    <Box
      width="full"
      backgroundColor={isActive ? 'opacityBlack50' : 'backgroundBase'}
      borderRadius="lg"
    >
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
          ''
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
            UserFolderName
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
