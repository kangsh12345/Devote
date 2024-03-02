'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Box } from '@/src/components/atoms/Box';
import { Button, NextAuthLoginButton } from '@/src/components/atoms/Button';
import { Divide } from '@/src/components/atoms/Divide';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';

import * as styles from './auth.css';
import { useAuth } from './useAuth';

export interface AuthProps {
  type: 'signin' | 'signup';
}

export const AuthPage = ({ type }: AuthProps) => {
  const {
    email,
    name,
    password,
    passwordCheck,
    emailError,
    nameError,
    passwordCheckError,
    passwordError,
    title,
    setTitle,
    handleEmailSignup,
    handleEmailSignin,
  } = useAuth();

  useEffect(() => {
    setTitle(type === 'signin' ? '로그인' : '회원가입');
  }, [type, setTitle]);

  return (
    <Box className={styles.root}>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.inputStack}>
        {type === 'signup' ? (
          <>
            <Input
              error={nameError}
              label="name"
              hideLabel
              placeholder="이름을 입력해주세요."
              maxLength={24}
              variant="outline"
              size="md"
              value={name.value}
              onChange={name.onChange}
            />
            {/* 추후 email로 6자리 코드 전송하여 인증 */}
            <Input
              error={emailError}
              label="email"
              hideLabel
              placeholder="이메일을 입력해주세요."
              variant="outline"
              maxLength={100}
              size="md"
              value={email.value}
              onChange={email.onChange}
            />
            <Input
              error={passwordError}
              description={
                passwordError
                  ? ''
                  : `특수기호 + 영문 + 숫자 조합 8자리 이상 입력해주세요.`
              }
              type="password"
              label="email password"
              hideLabel
              placeholder="비밀번호를 입력해 주세요."
              maxLength={24}
              variant="outline"
              size="md"
              value={password.value}
              onChange={password.onChange}
            />
            <Input
              error={passwordCheckError}
              label="email password check"
              type="password"
              hideLabel
              placeholder="비밀번호를 한번 더 입력해 주세요."
              maxLength={24}
              variant="outline"
              size="md"
              value={passwordCheck.value}
              onChange={passwordCheck.onChange}
            />
          </>
        ) : (
          <>
            <Input
              error={emailError}
              label="email"
              hideLabel
              placeholder="이메일을 입력해주세요."
              variant="outline"
              maxLength={100}
              size="md"
              value={email.value}
              onChange={email.onChange}
            />
            <Input
              error={passwordError}
              type="password"
              label="email password"
              hideLabel
              placeholder="비밀번호를 입력해 주세요."
              maxLength={24}
              variant="outline"
              size="md"
              value={password.value}
              onChange={password.onChange}
            />
          </>
        )}
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
            <Box color="brandPrimary" fontWeight={500}>
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
        소셜 {type === 'signin' ? '로그인' : '회원가입'}
      </Box>
      <Stack space="12" direction="horizontal">
        <NextAuthLoginButton name="google" />
        <NextAuthLoginButton name="github" />
      </Stack>
    </Box>
  );
};
