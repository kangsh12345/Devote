'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import clock from '@phosphor-icons/core/duotone/clock-countdown-duotone.svg';
import fire from '@phosphor-icons/core/duotone/fire-duotone.svg';
import gear from '@phosphor-icons/core/duotone/gear-duotone.svg';
import signout from '@phosphor-icons/core/duotone/sign-out-duotone.svg';
import star from '@phosphor-icons/core/duotone/star-duotone.svg';

import { Box } from '../../atoms/Box';
import { CopyRight } from '../../atoms/CopyRight';
import { Stack } from '../../atoms/Stack';
import { FolderBox } from '../../moecules/FolderBox';
import { SidebarLogo } from '../../moecules/SidebarLogo';
import { SidebarNav } from '../../moecules/SidebarNav';
import * as styles from './sidbar.css';

export interface SidebarProps {
  type?: 'sidebar' | 'drawer';
  isOpenDrawer?: boolean;
  setIsOpenDrawer?: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  type = 'sidebar',
  isOpenDrawer = false,
  setIsOpenDrawer,
}: SidebarProps) => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box className={styles.root({ isOpen, type })}>
      {type === 'drawer' ? (
        <SidebarLogo
          isOpen={isOpenDrawer}
          setIsOpen={setIsOpenDrawer}
          type={type}
        />
      ) : (
        <SidebarLogo isOpen={isOpen} setIsOpen={setIsOpen} type={type} />
      )}
      {(type === 'drawer' || (type === 'sidebar' && isOpen)) && (
        <Box className={styles.contentBox({ isOpen, type })}>
          <Box className={styles.top({})}>
            <Stack space="1">
              <Link href="/">
                <SidebarNav
                  isActive={pathname === '/' ? true : false}
                  icon={<Image src={fire} alt="icon" fill />}
                >
                  인기항목
                </SidebarNav>
              </Link>
              <Link href="/recent">
                <SidebarNav
                  isActive={pathname === '/recent' ? true : false}
                  icon={<Image src={clock} alt="icon" fill />}
                >
                  최신항목
                </SidebarNav>
              </Link>
            </Stack>
            <FolderBox />
          </Box>
          {/* <FolderBox own="other" /> */}
          <Box className={styles.bottom({})}>
            <Stack space="1">
              <Link href="/favorites">
                <SidebarNav
                  type="sub"
                  isActive={pathname === '/favorites' ? true : false}
                  icon={<Image src={star} alt="icon" fill />}
                >
                  즐겨찾기
                </SidebarNav>
              </Link>
              <Link href="/settings">
                <SidebarNav
                  type="sub"
                  isActive={pathname === '/settings' ? true : false}
                  icon={<Image src={gear} alt="icon" fill />}
                >
                  설정
                </SidebarNav>
              </Link>
              {session && (
                <Box onClick={() => signOut({ callbackUrl: '/' })}>
                  <SidebarNav
                    type="sub"
                    isActive={false}
                    icon={<Image src={signout} alt="icon" fill />}
                  >
                    로그아웃
                  </SidebarNav>
                </Box>
              )}
            </Stack>
            <CopyRight />
          </Box>
        </Box>
      )}
    </Box>
  );
};
