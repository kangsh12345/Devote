'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Box } from '../Box';
import { Divide } from '../Divide';
import * as styles from './avatarmenu.css';

export interface AvatarMenuProps {
  image: string;
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
}

export const AvatarMenu = ({
  image,
  size = 'md',
  disabled = false,
}: AvatarMenuProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      className={[
        styles.button({
          disabled,
        }),
      ]}
    >
      <Box
        width="9"
        height="9"
        overflow="hidden"
        borderRadius="full"
        position="relative"
        onClick={handleOpen}
      >
        <Image src={image} alt="avatar" fill sizes="100%" />
      </Box>
      {isOpen ? (
        <Box className={styles.ulContainer}>
          <Box className={styles.ulBox({ size: size })}>
            <Box as="ul">
              {/* <Box
                className={styles.liValue({})}
                as="li"
                fontSize="inherit"
                onClick={() => router.push('/favorites')}
              >
                <Box>즐겨찾기</Box>
              </Box> */}
              <Box
                className={styles.liValue({})}
                as="li"
                fontSize="inherit"
                onClick={() => router.push('/settings')}
              >
                <Box>설정</Box>
              </Box>
              <Box paddingX="2" paddingTop="1.5">
                <Divide />
              </Box>
              <Box
                className={styles.liValue({})}
                as="li"
                fontSize="inherit"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <Box>로그아웃</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
