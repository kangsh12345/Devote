'use client';

import { useState } from 'react';

import { Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './writeHeader.css';

export const WriteHeader = () => {
  const [state, setState] = useState('');
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
              <Avatars size="md" text="김아무개" />
              <Box fontSize="1" fontWeight={700} color="textSecondary">
                / 프론트
              </Box>
              <Box paddingLeft="1" width="56">
                <Input
                  label="input label"
                  hideLabel
                  placeholder="제목을 입력해주세요"
                  variant="outline"
                  size="sm"
                  value={state}
                  onChange={event => setState(event.target.value)}
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
