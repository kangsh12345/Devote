'use client';

import {
  ChangeEvent,
  Dispatch,
  EventHandler,
  SetStateAction,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { Drawer } from '../../moecules/Drawer';
import { HeaderLogo } from '../../moecules/HeaderLogo';
import * as styles from './writeHeader.css';

export interface WriteHeaderProps {
  image: string;
  path: string;
  title: string;
  handleInput: EventHandler<ChangeEvent<HTMLInputElement>>;
  setCreateFolderOpen: Dispatch<SetStateAction<boolean>>;
  error: string;
}

export const WriteHeader = ({
  path,
  title,
  handleInput,
  setCreateFolderOpen,
  error,
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

        <Box display="flex" paddingLeft="3" paddingRight="8" flex="auto">
          <Box
            gap="2"
            display="flex"
            flexDirection="row"
            alignItems="center"
            flex="auto"
          >
            <Box
              fontSize="1"
              fontWeight={700}
              color="textSecondary"
              className={styles.ellipsis}
              flexShrink={3}
            >
              {path.split('/').at(-2)}
            </Box>
            <Box fontSize="4" fontWeight={500} color="textTertiary">
              |
            </Box>
            <Box display="flex" flex="auto">
              <Input
                label="input label"
                hideLabel
                placeholder="제목을 입력해주세요"
                variant="outline"
                size="sm"
                value={title}
                onChange={handleInput}
                maxLength={24}
                error={error}
              />
            </Box>
          </Box>
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
            onClick={() => setCreateFolderOpen(true)}
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
