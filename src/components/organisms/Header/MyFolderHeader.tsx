'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ListBullets, SquaresFour } from '@phosphor-icons/react';

import { AvatarMenu } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { BreadcrumbDynamicEllipsis } from '../../atoms/BreadcrumbDynamicEllipsis';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { ListToggle } from '../../atoms/Toggle';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './header.css';

export interface HeaderProps {
  isActive: 'column' | 'row';
  setIsActive: Dispatch<SetStateAction<'column' | 'row'>>;
  userName?: string;
  path?: string;
}

export const MyFolderHeader = ({
  isActive,
  setIsActive,
  path,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  return (
    <Box className={styles.root({ type: 'myFolder' })}>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={styles.box({})}>
        <Box className={styles.breakpoint({ type: 'side' })}>
          <HeaderLogo isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
        <Box display="flex" flex="auto">
          <Stack space="6" direction="horizontal" flex="auto">
            <Box className={styles.breakpoint({ type: 'header' })}>
              <Stack space="2" direction="horizontal" align="center">
                <Box onClick={() => setIsActive('row')}>
                  <ListToggle
                    isActive={isActive === 'row'}
                    color="secondary"
                    icon={<SquaresFour size={24} weight="duotone" />}
                  />
                </Box>
                <Box onClick={() => setIsActive('column')}>
                  <ListToggle
                    isActive={isActive === 'column'}
                    color="secondary"
                    icon={<ListBullets size={24} weight="duotone" />}
                  />
                </Box>
              </Stack>
            </Box>

            <Box
              flexDirection="row"
              gap="2"
              display="flex"
              flex="auto"
              alignItems="center"
            >
              <BreadcrumbDynamicEllipsis fullPath={`나의 폴더/${path}`} />
            </Box>
          </Stack>
        </Box>
        <Stack space="3" direction="horizontal" align="center">
          {session && session.user.image && (
            <AvatarMenu image={session.user.image} />
          )}
        </Stack>
      </Box>
      <Box marginTop="-2" className={styles.switcher()}>
        <ThemeSwitcher size="md" />
      </Box>
    </Box>
  );
};
