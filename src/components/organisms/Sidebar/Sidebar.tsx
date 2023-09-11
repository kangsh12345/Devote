'use client';

import { useState } from 'react';
import Image from 'next/image';
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

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive] = useState(false);

  return (
    // TODO: Fix로 position
    <Box className={styles.root({ isOpen })}>
      <SidebarLogo isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <Box className={styles.contentBox({ isOpen })}>
          <Box className={styles.top({})}>
            <Stack space="1">
              <SidebarNav
                isActive={isActive}
                icon={<Image src={fire} alt="icon" fill />}
              >
                인기항목
              </SidebarNav>
              <SidebarNav
                isActive={isActive}
                icon={<Image src={clock} alt="icon" fill />}
              >
                최신항목
              </SidebarNav>
            </Stack>
            <FolderBox />
          </Box>
          <FolderBox own="other" />
          <Box className={styles.bottom({})}>
            <Stack space="1">
              <SidebarNav
                type="sub"
                isActive={isActive}
                icon={<Image src={star} alt="icon" fill />}
              >
                즐겨찾기
              </SidebarNav>
              <SidebarNav
                type="sub"
                isActive={isActive}
                icon={<Image src={gear} alt="icon" fill />}
              >
                설정
              </SidebarNav>
              <SidebarNav
                type="sub"
                isActive={isActive}
                icon={<Image src={signout} alt="icon" fill />}
              >
                로그아웃
              </SidebarNav>
            </Stack>
            <CopyRight />
          </Box>
        </Box>
      )}
    </Box>
  );
};
