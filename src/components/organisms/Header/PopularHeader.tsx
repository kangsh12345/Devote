'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ListBullets, SquaresFour } from '@phosphor-icons/react';

import { AvatarMenu } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
// import { Select } from '../../atoms/Select';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { ListToggle } from '../../atoms/Toggle';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './header.css';

export interface HeaderProps {
  isActive: 'column' | 'row';
  setIsActive: Dispatch<SetStateAction<'column' | 'row'>>;
}

export const PopularHeader = ({ isActive, setIsActive }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <Box className={styles.root({ type: 'popular' })}>
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
            <Box
              fontSize="3"
              fontWeight={700}
              display="flex"
              alignItems="center"
            >
              최근항목
            </Box>
          </Stack>
        </Box>
        <Stack space="3" direction="horizontal" align="center">
          {/* TODO: Select Portal로 이동 b/c root overflow hidden */}
          {/* {type === 'popular' && <Select size="sm" list={selectList} />} */}
          {/* <IconButton
            size="md"
            icon={<MagnifyingGlass size={20} weight="duotone" />}
          /> */}
          {!session ? (
            <Link href="/auth/signin">
              <Button
                size="sm"
                variant="solid"
                radius="full"
                color="black"
                width="fit"
              >
                로그인
              </Button>
            </Link>
          ) : (
            session &&
            session.user.image && <AvatarMenu image={session.user.image} />
          )}
        </Stack>
      </Box>
      <Box marginTop="-2" className={styles.switcher()}>
        <ThemeSwitcher size="md" />
      </Box>
    </Box>
  );
};
