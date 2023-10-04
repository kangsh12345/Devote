'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Box } from '@/src/components/atoms/Box';
import { Button, NextAuthLoginButton } from '@/src/components/atoms/Button';
import { Divide } from '@/src/components/atoms/Divide';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';

import * as styles from './auth.css';

export interface AuthProps {
  type: 'signin' | 'signup';
}

export const Auth = ({ type }: AuthProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const title = type === 'signin' ? '로그인' : '회원가입';

  const handleEmailSignup = () => {
    fetch(`/api/auth/sign-up/email`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        image: 'https://source.boringavatars.com/beam',
      }),
    }).then(data => console.log(data));
  };

  const handleEmailSignin = async () => {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: callbackUrl ?? '/',
    });
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.inputStack}>
        {type === 'signup' && (
          <Input
            label="email name"
            hideLabel
            placeholder="이름을 입력해주세요"
            variant="outline"
            size="md"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        )}
        <Input
          label="email email"
          hideLabel
          placeholder="이메일을 입력해주세요"
          variant="outline"
          size="md"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          label="email password"
          // 추후 type password 구현
          hideLabel
          placeholder="비밀번호을 입력해주세요"
          variant="outline"
          size="md"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="2.5" width="full">
        {type === 'signin' ? (
          <Box onClick={handleEmailSignin} width="full">
            <Button size="lg" radius="md" color="brand">
              이메일 로그인
            </Button>
          </Box>
        ) : (
          <Box onClick={handleEmailSignup} width="full">
            <Button size="lg" radius="md" color="brand">
              이메일 회원가입
            </Button>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="flex-end"
          fontSize="1"
          color="textTertiary"
          gap="1"
        >
          {type === 'signin' ? '계정이 없으신가요?' : '계정이 이미 있으신가요?'}
          <Link href={`/auth/${type === 'signin' ? 'signup' : 'signin'}`}>
            <Box color="brandPrimary">
              {type === 'signin' ? '회원가입' : '로그인'}
            </Box>
          </Link>
        </Box>
      </Box>
      <Divide />
      <Box
        display="flex"
        width="full"
        justifyContent="flex-start"
        fontSize="1"
        color="textTertiary"
      >
        소셜 회원가입
      </Box>
      <Stack space="12" direction="horizontal">
        <NextAuthLoginButton name="google" />
        <NextAuthLoginButton name="github" />
      </Stack>
    </Box>
  );
};
