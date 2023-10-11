'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  ArrowLeft,
  FilePlus,
  FolderPlus,
  ListBullets,
  MagnifyingGlass,
  SquaresFour,
} from '@phosphor-icons/react';

import { AvatarMenu, Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Button, IconButton } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Select } from '../../atoms/Select';
import { Stack } from '../../atoms/Stack';
import { ThemeSwitcher } from '../../atoms/ThemeSwitcher';
import { ListToggle } from '../../atoms/Toggle';
import * as styles from './header.css';

export interface HeaderProps {
  type?: 'popular' | 'folder' | 'myFolder' | 'post' | 'write' | 'auth';
}

export const Header = ({ type = 'popular' }: HeaderProps) => {
  const router = useRouter();
  const [state, setState] = useState('');

  const { data: session } = useSession();

  const selectList = ['오늘', '이번주', '이번달', '전체'];

  return (
    <Box className={styles.root({ type })}>
      <Box className={styles.box({})}>
        {type === 'auth' ? (
          <Box onClick={() => router.back()}>
            <IconButton
              size="lg"
              icon={<ArrowLeft size={24} weight="bold" />}
            />
          </Box>
        ) : (
          <>
            <Stack space="6" direction="horizontal">
              {type === 'post' ||
                (type === 'write' ? (
                  ''
                ) : (
                  <Stack space="2" direction="horizontal" align="center">
                    <ListToggle
                      isActive={true}
                      color="secondary"
                      icon={<SquaresFour size={24} weight="duotone" />}
                    />
                    <ListToggle
                      isActive={false}
                      color="secondary"
                      icon={<ListBullets size={24} weight="duotone" />}
                    />
                  </Stack>
                ))}

              {type === 'popular' && (
                <Box
                  fontSize="3"
                  fontWeight={700}
                  display="flex"
                  alignItems="center"
                >
                  인기항목
                </Box>
              )}
              {type !== 'popular' && (
                <Stack direction="horizontal" space="2" align="center">
                  {type === 'myFolder' ? (
                    <Box fontSize="2" fontWeight={500}>
                      나의 폴더
                    </Box>
                  ) : (
                    <Avatars size="md" text="김아무개" />
                  )}
                  <Box fontSize="1" fontWeight={700} color="textSecondary">
                    / 프론트
                  </Box>
                  {type === 'write' && (
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
                  )}
                </Stack>
              )}
            </Stack>
            <Stack space="3" direction="horizontal" align="center">
              {/* TODO: Select Portal로 이동 b/c root overflow hidden */}
              {type === 'popular' && <Select size="sm" list={selectList} />}
              {type === 'post' ||
                (type === 'write' ? (
                  ''
                ) : (
                  <IconButton
                    size="md"
                    icon={<MagnifyingGlass size={20} weight="duotone" />}
                  />
                ))}
              {type === 'myFolder' && (
                <>
                  <IconButton
                    size="md"
                    icon={<FilePlus size={20} weight="duotone" />}
                  />
                  <IconButton
                    size="md"
                    icon={<FolderPlus size={20} weight="duotone" />}
                  />
                </>
              )}
              {(type === 'popular' || type === 'folder') && !session ? (
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
                session.user.image &&
                (type === 'popular' ||
                  type === 'folder' ||
                  type === 'myFolder') && (
                  <AvatarMenu image={session.user.image} />
                )
              )}
              {type === 'write' && (
                <>
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
                </>
              )}
            </Stack>
          </>
        )}
      </Box>
      <Box marginTop="-2" className={styles.switcher()}>
        <ThemeSwitcher size="md" />
      </Box>
    </Box>
  );
};
