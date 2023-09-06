import { PropsWithChildren } from 'react';
import { CaretDown, CaretRight } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './folderListItem.css';

export interface FolderListItemProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  isOpened?: boolean;
}

export const FolderListItem = ({
  size = 'md',
  isOpened = false,
  children,
}: PropsWithChildren<FolderListItemProps>) => {
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
        <Box color="textSecondary" display="flex" alignItems="center">
          {isOpened ? (
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
          ) : (
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
          )}
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};
