import { CaretDown, CaretRight } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './folderList.css';

export interface FolderListProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  isOpened?: boolean;
}

export const FolderList = ({
  size = 'md',
  isOpened = false,
}: FolderListProps) => {
  return (
    <Box width="full" className={styles.root({ size })}>
      <Stack
        space={
          size === 'xl'
            ? '2.5'
            : size === 'lg'
            ? '2'
            : size === 'md'
            ? '1.5'
            : '1'
        }
        direction="horizontal"
        align="center"
      >
        {isOpened ? (
          <CaretRight
            weight="duotone"
            size={
              size === 'xl'
                ? '28'
                : size === 'lg'
                ? '24'
                : size === 'md'
                ? '20'
                : '16'
            }
          />
        ) : (
          <CaretDown
            weight="duotone"
            size={
              size === 'xl'
                ? '28'
                : size === 'lg'
                ? '24'
                : size === 'md'
                ? '20'
                : '16'
            }
          />
        )}
        <Box>UserFolderName</Box>
      </Stack>
    </Box>
  );
};
