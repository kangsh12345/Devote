'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Box } from '@/src/components/atoms/Box';
import { Button, NextAuthLoginButton } from '@/src/components/atoms/Button';
import { Divide } from '@/src/components/atoms/Divide';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';
import isEmail from 'validator/lib/isEmail';

import * as styles from './auth.css';

export interface AuthProps {
  type: 'signin' | 'signup';
}

export const Auth = ({ type }: AuthProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');

  const title = type === 'signin' ? '로그인' : '회원가입';
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,24}$/;

  const handleEmailSignup = () => {
    if (!passwordRegex.test(password)) {
      setPasswordError('특수기호 + 영문 + 숫자 조합 8자리 이상 입력해주세요.');
      setPasswordCheckError('올바른 비밀번호를 입력해주세요.');
      return;
    } else if (password != passwordCheck) {
      setPasswordCheckError('동일한 비밀번호를 입력해주세요.');
      return;
    } else if (emailError || passwordError || passwordCheckError) {
      return;
    }

    fetch(`/api/auth/sign-up/email/check`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert('이미 가입된 이메일 입니다.');
          router.push('/auth/signin');
        }
      });

    fetch(`/api/auth/sign-up/email`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        image: 'https://source.boringavatars.com/beam',
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          router.push('/');
        }
      });
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
        {type === 'signup' ? (
          <>
            <Input
              label="email name"
              hideLabel
              placeholder="닉네임을 입력해주세요."
              maxLength={24}
              variant="outline"
              size="md"
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
            />
            <Input
              // TODO: 중복된 이메일 시 deboune fetch를 이용하여 error message 출력
              error={emailError}
              label="email email"
              hideLabel
              placeholder="이메일을 입력해주세요."
              variant="outline"
              size="md"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                if (!isEmail(event.target.value)) {
                  setEmailError('이메일 형식으로 작성해주세요.');
                } else {
                  setEmailError('');
                }
              }}
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
              value={password}
              onChange={event => {
                setPassword(event.target.value);
                if (
                  passwordError !== '' &&
                  passwordRegex.test(event.target.value)
                ) {
                  setPasswordError('');
                }
              }}
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
              value={passwordCheck}
              onChange={event => {
                setPasswordCheck(event.target.value);
                if (
                  passwordCheckError !== '' &&
                  password === event.target.value
                ) {
                  setPasswordCheckError('');
                }
              }}
            />
          </>
        ) : (
          <>
            <Input
              error={emailError}
              label="email email"
              hideLabel
              placeholder="이메일을 입력해주세요."
              variant="outline"
              size="md"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input
              label="email password"
              // 추후 type password 구현
              type="password"
              maxLength={24}
              hideLabel
              placeholder="비밀번호를 입력해 주세요."
              variant="outline"
              size="md"
              value={password}
              onChange={event => setPassword(event.target.value)}
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
        소셜 회원가입
      </Box>
      <Stack space="12" direction="horizontal">
        <NextAuthLoginButton name="google" />
        <NextAuthLoginButton name="github" />
      </Stack>
    </Box>
  );
};
