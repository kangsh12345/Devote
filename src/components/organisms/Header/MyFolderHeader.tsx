'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ListBullets, SquaresFour } from '@phosphor-icons/react';

import { AvatarMenu } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <Box className={styles.root({ type: 'myFolder' })}>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={styles.box({})}>
        <Box className={styles.breakpoint({ type: 'side' })}>
          <HeaderLogo isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
        <Box display="flex" flexShrink={0}>
          <Stack space="6" direction="horizontal">
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

            <Stack direction="horizontal" space="2" align="center">
              <Box fontSize="2" fontWeight={500}>
                나의 폴더
              </Box>
              <Box
                fontSize="1"
                fontWeight={700}
                color="textSecondary"
                display="flex"
                flexDirection="row"
                gap="1"
              >
                {path?.split('/').map((item, idx) => (
                  <Box
                    onClick={() =>
                      router.push(
                        `/posts/${path
                          .split('/')
                          .slice(0, idx + 1)
                          .join('/')}`,
                      )
                    }
                    key={idx}
                  >
                    / {item}
                  </Box>
                ))}
              </Box>
            </Stack>
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
