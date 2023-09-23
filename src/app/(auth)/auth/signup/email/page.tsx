'use client';

import { FormEvent, useState } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Button } from '@/src/components/atoms/Button';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';

export default function Email() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack>
        <Input
          label="email name"
          hideLabel
          placeholder="이름을 입력해주세요"
          variant="outline"
          size="sm"
          value={name}
          onChange={event => setName(event.target.value)}
        />
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
          <Button>회원가입</Button>
        </Box>
      </Stack>
    </Box>
  );
}
