'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CopyRight } from '@/src/components/atoms/CopyRight';
import { Logo } from '@/src/components/atoms/Logo';
import { Text } from '@/src/components/atoms/Typography';
import magnifyingGlass from '@phosphor-icons/core/duotone/magnifying-glass-duotone.svg';
import squaresFourDutone from '@phosphor-icons/core/duotone/squares-four-duotone.svg';
import { SquaresFour } from '@phosphor-icons/react';

// import { CardHover } from '../../moecules/CardHover';
// import { FolderBox } from '../../moecules/FolderBox';
// import { SidebarLogo } from '../../moecules/SidebarLogo';
import { SidebarNav } from '../../moecules/SidebarNav';
import { Header } from '../../organisms/Header';
import { MarkdownHeader } from '../../organisms/MarkdownHeader';
import { PostCard } from '../../organisms/PostCard';
import { Sidebar } from '../../organisms/Sidebar';
import { Avatars } from '../Avatars';
import { Box } from '../Box';
import { Button, CloseButton, IconButton } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
// import { FileList, FolderListItem } from '../List';
// import { ModalOverlay } from '../Modal';
import { ListItem, Popover } from '../Popover';
import { Select } from '../Select';
import { Stack } from '../Stack';
import { IconText } from '../Text';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ListToggle } from '../Toggle';
import * as styles from './test.css';

//TODO: 컴포넌트, 컨테이너 분리 작업 사용 atom 이용 organisms에 적용

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

  const { data: session } = useSession();

  return (
    <Box paddingBottom="80" display="flex" width="full">
      <Stack space="4" flex="auto">
        <Box onClick={() => console.log(session)}>----atoms----</Box>
        <ThemeSwitcher size="lg" />
        {/* <ModalOverlay visible={false} /> */}
        {/* <ModalContent
          type="right"
          withCloseButton={true}
          title="Delete User"
          leftButtonText="취소"
          rightButtonText="삭제"
        >
          Are you sure? You can't undo this action afterwards.
        </ModalContent> */}
        <Box marginLeft="64">
          <Popover size="md" list={popoverList} />
        </Box>
        <Input
          label="Label"
          hideLabel
          placeholder="Placeholder"
          leftIcon={<SquaresFour />}
          value={state}
          error="error"
          size="lg"
          variant="filled"
          onChange={event => setState(event.target.value)}
        />
        <Text size="h1" weight="bold" color="brandPrimary">
          Text테스트
        </Text>
        <Logo size="md" />
        <CopyRight />
        <Select size="md" list={selectList} />
        <Avatars size="md" text="devote" />
        <Stack direction="horizontal">
          <ListToggle
            size="md"
            isActive={false}
            color="primary"
            icon={
              <Image src={squaresFourDutone} alt="icon" fill sizes="100%" />
            }
          />
          <ListToggle
            size="md"
            isActive={true}
            color="primary"
            icon={
              <Image src={squaresFourDutone} alt="icon" fill sizes="100%" />
            }
          />
        </Stack>
        <CloseButton size="md" />
        <Stack direction="horizontal">
          <IconButton
            size="md"
            variant="normal"
            icon={<Image src={magnifyingGlass} alt="icon" fill sizes="100%" />}
          />
          <IconButton
            size="md"
            variant="outline"
            icon={<Image src={magnifyingGlass} alt="icon" fill sizes="100%" />}
          />
        </Stack>
        <Button
          size="lg"
          variant="solid"
          radius="md"
          color="brand"
          rightIcon={<SquaresFour />}
          leftIcon={<SquaresFour />}
        >
          버튼
        </Button>
        {/* TODO: 추후 post 불러와서 child로 넘겨주는 식으로 동작 */}
        <Box className={styles.cardContainer}>
          <Card variant="outline" />
          <Card variant="outline" />
          <Card variant="outline" />
          <Card variant="outline" />
          <Card variant="outline" />
          <Card skeleton />
        </Box>
        {/* <FolderListItem size="lg" isOpened={false} />
        <FolderListItem size="lg" isOpened={true} /> */}
        {/* <FileList /> */}
        <IconText
          size="lg"
          rightIcon={
            <Image src={squaresFourDutone} alt="icon" fill sizes="100%" />
          }
          leftIcon={
            <Image src={squaresFourDutone} alt="icon" fill sizes="100%" />
          }
        >
          Icon Text
        </IconText>
        <Box>----molecules----</Box>
        <SidebarNav
          type="main"
          size="lg"
          isActive={true}
          icon={<Image src={squaresFourDutone} alt="icon" fill sizes="100%" />}
        >
          Sidebar Nav
        </SidebarNav>
        {/* <SidebarLogo /> */}
        {/* <Card variant="outline" /> */}
        <Box width="106">
          <Box className={styles.cardContainer}>{/* <CardHover /> */}</Box>
        </Box>
        {/* <FolderBox /> */}
        <Box>----organisms----</Box>
        <Sidebar />
        <MarkdownHeader />
        <Header type="popular" />
        <Header type="folder" />
        <Header type="myFolder" />
        <Header type="auth" />

        <Box className={styles.cardContainer}>
          <PostCard skeleton />
        </Box>
      </Stack>
    </Box>
  );
}
