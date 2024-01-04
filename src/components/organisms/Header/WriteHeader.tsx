'use client';

import { ChangeEvent, EventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './writeHeader.css';

export interface WriteHeaderProps {
  name: string;
  image: string;
  path: string;
  title: string;
  handleInput: EventHandler<ChangeEvent<HTMLInputElement>>;
}

export const WriteHeader = ({
  name,
  path,
  title,
  handleInput,
}: WriteHeaderProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={styles.root}>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={styles.box}>
        <Box className={styles.breakpoint({ type: 'side' })}>
          <HeaderLogo isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>

        <Box display="flex" flexShrink={0}>
          <Stack space="6" direction="horizontal">
            <Stack direction="horizontal" space="2" align="center">
              <Avatars size="md" text={name} />
              <Box fontSize="1" fontWeight={700} color="textSecondary">
                /{path}
              </Box>
              <Box width="56">
                <Input
                  label="input label"
                  hideLabel
                  placeholder="제목을 입력해주세요"
                  variant="outline"
                  size="sm"
                  value={title}
                  onChange={handleInput}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Stack space="3" direction="horizontal" align="center">
          <Button
            size="sm"
            variant="outline"
            radius="full"
            color="brand"
            width="fit"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            size="sm"
            variant="solid"
            radius="full"
            color="brand"
            width="fit"
          >
            저장
          </Button>
        </Stack>
      </Box>
      <Box marginTop="-2" className={styles.switcher}>
        <ThemeSwitcher size="md" />
      </Box>
    </Box>
  );
};
