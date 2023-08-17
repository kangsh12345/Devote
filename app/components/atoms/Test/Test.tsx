'use client';

import { useState } from 'react';
import { CopyRight } from '@/app/components/atoms/CopyRight';
import { Logo } from '@/app/components/atoms/Logo';
import { Text } from '@/app/components/atoms/Typography';
import { FileSearch } from '@phosphor-icons/react';

import { Input } from '../Input';
import { ListItem, Popover } from '../Popover';
import { Select } from '../Select';
import { Stack } from '../Stack';
import { ThemeSwitcher } from '../ThemeSwitcher';
import * as styles from './test.css';

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
    <Stack space="4">
      <ThemeSwitcher size="lg" />
      <div className={styles.variants({ color: 'brand' })}>example</div>
      <Input
        label="Label"
        hideLabel
        placeholder="Placeholder"
        leftIcon={<FileSearch />}
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
      <CopyRight size="md" />
      <Select size="md" list={selectList} />
      <Popover size="md" list={popoverList} />
    </Stack>
  );
}
