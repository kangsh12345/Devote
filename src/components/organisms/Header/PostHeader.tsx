'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './postHeader.css';

export interface PostHeaderProps {
  name: string;
  title: string;
  date: Date;
  own: boolean;
}

export const PostHeader = ({ name, title, date, own }: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={styles.root}>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={styles.box}>
        <Box className={styles.breakpoint({ type: 'side' })}>
          <HeaderLogo isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
        <Box display="flex" flexShrink={1}>
          <Stack space="6" direction="horizontal">
            <Stack direction="horizontal" space="1.5" align="center">
              <Stack direction="horizontal" space="0" align="center">
                {!own && (
                  <Box className={styles.avatarBreakpoint}>
                    <Avatars size="md" />
                  </Box>
                )}
                <Box
                  marginTop="0.5"
                  fontWeight={500}
                  className={styles.titleEllpsis}
                  flexShrink={1}
                >
                  {!own ? name : ''}
                </Box>
              </Stack>
              {!own && (
                <Box
                  fontSize="4"
                  fontWeight={500}
                  marginTop="0.5"
                  color="textTertiary"
                  marginX="1"
                >
                  |
                </Box>
              )}
              <Box className={styles.titleEllpsis} flexShrink={1}>
                {title}
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Stack space="3" direction="horizontal" align="center">
          <Stack direction="horizontal" space="6">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="textTertiary"
              paddingLeft="6"
              fontSize="1"
              flexShrink={0}
            >
              {format(new Date(date), 'yyyy년 M월 d일')}
            </Box>
            {/* <IconText
              type="cardhover"
              size="lg"
              leftIcon={<Image src={star} alt="icon" fill sizes="100%" />}
            >
              <Box color="textSecondary">20</Box>
            </IconText> */}
          </Stack>
        </Stack>
      </Box>
      <Box marginTop="-2" className={styles.switcher}>
        <ThemeSwitcher size="md" />
      </Box>
    </Box>
  );
};
