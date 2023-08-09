'use client';

import { CopyRight } from '@/app/components/atoms/CopyRight';
import { Logo } from '@/app/components/atoms/Logo';
import { Test } from '@/app/components/atoms/Test';
import { ThemeSwitcher } from '@/app/components/atoms/ThemeSwitcher';
import Text from '@/app/components/atoms/Typography/Text';

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <Test />
      <Text size="h1" weight="bold" color="brandPrimary">
        Text테스트
      </Text>
      <Logo size="md" />
      <CopyRight size="md" />
    </div>
  );
}
