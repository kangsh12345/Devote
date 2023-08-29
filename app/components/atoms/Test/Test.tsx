'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CopyRight } from '@/app/components/atoms/CopyRight';
import { Logo } from '@/app/components/atoms/Logo';
import { Text } from '@/app/components/atoms/Typography';
import MagnifyingGlass from '@phosphor-icons/core/duotone/magnifying-glass-duotone.svg';
import squaresFourDutone from '@phosphor-icons/core/duotone/squares-four-duotone.svg';
import { FileSearch, SquaresFour } from '@phosphor-icons/react';

import { Avatars } from '../Avatars';
import { Box } from '../Box';
import { Button, CloseButton, IconButton } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { FileList, FolderListItem } from '../List';
import { ModalActions, ModalContent, ModalOverlay } from '../Modal';
import { ListItem, Popover } from '../Popover';
import { Select } from '../Select';
import { Stack } from '../Stack';
import { IconText } from '../Text';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ListToggle, SidebarToggle } from '../Toggle';

//TODO: 컴포넌트, 컨테이너 분리 작업 사용 atom 이용

export function Test() {
  const [state, setState] = useState('');
  const selectList = ['오늘', '이번주', '이번달', '전체'];

  const popoverList: ListItem[] = [
    { value: '대제목1', heading: 1 },
    { value: '대제목2', heading: 1 },
    { value: '중제목1', heading: 2 },
    { value: '소제목1', heading: 3 },
    { value: '대제목3', heading: 1 },
  ];

  return (
    <Box paddingBottom="80">
      <Stack space="4">
        <ThemeSwitcher size="lg" />
        <ModalOverlay visible={false} />
        <ModalActions
          type="right"
          leftButtonText="취소"
          rightButtonText="삭제"
        />
        <ModalContent
          type="right"
          withCloseButton={true}
          title="Delete User"
          leftButtonText="취소"
          rightButtonText="삭제"
        >
          Are you sure? You can't undo this action afterwards.
        </ModalContent>
        <Popover size="md" list={popoverList} />
        <Input
          label="Label"
          hideLabel
          placeholder="Placeholder"
          leftIcon={<FileSearch />}
          value={state}
          error="error"
          size="md"
          variant="filled"
          onChange={event => setState(event.target.value)}
        />
        <Text size="h1" weight="bold" color="brandPrimary">
          Text테스트
        </Text>
        <Logo size="md" />
        <CopyRight size="md" />
        <Select size="md" list={selectList} />
        <Avatars size="md" text="devote" />
        <Stack direction="horizontal">
          <ListToggle
            size="md"
            isActive={false}
            color="primary"
            icon={<Image src={squaresFourDutone} alt="icon" fill />}
          />
          <ListToggle
            size="md"
            isActive={true}
            color="primary"
            icon={<Image src={squaresFourDutone} alt="icon" fill />}
          />
        </Stack>
        <Stack direction="horizontal">
          <SidebarToggle size="md" />
        </Stack>
        <CloseButton size="md" />
        <Stack direction="horizontal">
          <IconButton
            size="md"
            variant="normal"
            icon={<Image src={MagnifyingGlass} alt="icon" fill />}
          />
          <IconButton
            size="md"
            variant="outline"
            icon={<Image src={MagnifyingGlass} alt="icon" fill />}
          />
        </Stack>
        <Button
          size="md"
          variant="solid"
          radius="md"
          color="brand"
          rightIcon={<SquaresFour />}
          leftIcon={<SquaresFour />}
        >
          Button
        </Button>
        <IconText
          size="md"
          rightIcon={<SquaresFour />}
          leftIcon={<SquaresFour />}
        >
          Icon Text
        </IconText>
        <Card variant="outline" />
        <FolderListItem size="lg" isOpened={false} />
        <FolderListItem size="lg" isOpened={true} />
        <FileList />
      </Stack>
    </Box>
  );
}
