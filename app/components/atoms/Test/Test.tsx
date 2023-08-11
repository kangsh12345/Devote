'use client';

import { useState } from 'react';
import { CopyRight } from '@/app/components/atoms/CopyRight';
import { Logo } from '@/app/components/atoms/Logo';
import { Text } from '@/app/components/atoms/Typography';
import { FileSearch } from '@phosphor-icons/react';

import { Input } from '../Input';
import { Select } from '../Select';
import * as styles from './test.css';

export function Test() {
  const [state, setState] = useState('');

  return (
    <div>
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
      <Select size="lg" />
    </div>
  );
}
