'use client';

import { FormEvent, useState } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Button, GoogleLoginButton } from '@/src/components/atoms/Button';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';

export default function Login() {
  // 이메일 로그인
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: FormEvent) => {
    e.preventDefault();

    fetch(`/api/auth/sign-in/email`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(data => console.log(data));
  };

  return (
    <Box>
      <GoogleLoginButton />
      {/* 이메일 로그인 */}
      <Box as="form" onSubmit={handleEmailLogin}>
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
          <Box as="button" type="submit">
            <Button>로그인</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
