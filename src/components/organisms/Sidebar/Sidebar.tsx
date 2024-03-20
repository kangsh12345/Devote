'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useResizeSidebar } from '@/src/utils/useResizeSidebar';
import clock from '@phosphor-icons/core/duotone/clock-countdown-duotone.svg';
// import fire from '@phosphor-icons/core/duotone/fire-duotone.svg';
import gear from '@phosphor-icons/core/duotone/gear-duotone.svg';
import signin from '@phosphor-icons/core/duotone/sign-in-duotone.svg';
import signout from '@phosphor-icons/core/duotone/sign-out-duotone.svg';

// import star from '@phosphor-icons/core/duotone/star-duotone.svg';
import { Box } from '../../atoms/Box';
import { CopyRight } from '../../atoms/CopyRight';
import { Stack } from '../../atoms/Stack';
import { FolderBox, FolderBoxOther } from '../../moecules/FolderBox';
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
  const param = useParams();
  const id = decodeURIComponent(decodeURIComponent(param.id));

  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  useResizeSidebar(sidebarRef, resizeHandleRef);

  const own = param.id && id === session?.user.dirName ? true : false;

  return (
    <Box className={styles.root({ isOpen, type })} ref={sidebarRef}>
      <Box className={styles.resizeBar} ref={resizeHandleRef} />
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
              {/* <Link href="/">
                <SidebarNav
                  isActive={pathname === '/' ? true : false}
                  icon={<Image src={fire} alt="icon" fill sizes="100%" />}
                >
                  인기항목
                </SidebarNav>
              </Link> */}
              <Link href="/">
                <SidebarNav
                  isActive={pathname === '/' ? true : false}
                  icon={<Image src={clock} alt="icon" fill sizes="100%" />}
                >
                  최신항목
                </SidebarNav>
              </Link>
            </Stack>
          </Box>
          <Box className={styles.folderBoxWrapper}>
            <Box height="fit">
              <FolderBox />
            </Box>
            {param.id && !own && (
              <Box height="fit">
                <FolderBoxOther />
              </Box>
            )}
          </Box>
          <Box className={styles.bottom({})}>
            <Stack space="1">
              {/* <Link href="/favorites">
                <SidebarNav
                  type="sub"
                  isActive={pathname === '/favorites' ? true : false}
                  icon={<Image src={star} alt="icon" fill sizes="100%" />}
                >
                  즐겨찾기
                </SidebarNav>
              </Link> */}
              {session ? (
                <>
                  <Link href="/settings">
                    <SidebarNav
                      type="sub"
                      isActive={pathname === '/settings' ? true : false}
                      icon={<Image src={gear} alt="icon" fill sizes="100%" />}
                    >
                      설정
                    </SidebarNav>
                  </Link>
                  <Box onClick={() => signOut({ callbackUrl: '/' })}>
                    <SidebarNav
                      type="sub"
                      isActive={false}
                      icon={
                        <Image src={signout} alt="icon" fill sizes="100%" />
                      }
                    >
                      로그아웃
                    </SidebarNav>
                  </Box>
                </>
              ) : (
                <Link href="/auth/signin">
                  <SidebarNav
                    type="sub"
                    icon={<Image src={signin} alt="icon" fill sizes="100%" />}
                  >
                    로그인
                  </SidebarNav>
                </Link>
              )}
            </Stack>
            <CopyRight />
          </Box>
        </Box>
      )}
    </Box>
  );
};
