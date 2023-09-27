'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Box } from '@/src/components/atoms/Box';
import { Button, NextAuthLoginButton } from '@/src/components/atoms/Button';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';

export default function Login() {
  // 이메일 로그인
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <Box>
      <NextAuthLoginButton />
      {/* 이메일 로그인 */}
      <Stack>
        <Input
          label="email email"
          hideLabel
          placeholder="이메일을 입력해주세요"
          variant="outline"
          size="sm"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          label="email password"
          // 추후 type password 구현
          hideLabel
          placeholder="비밀번호을 입력해주세요"
          variant="outline"
          size="sm"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <Box onClick={handleEmailLogin}>
          <Button>이메일 로그인</Button>
        </Box>
      </Stack>
    </Box>
  );
}
