'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { Box } from '../Box';
import { Hover } from '../Hover';

export interface NextAuthLoginButtonProps {
  name: 'google' | 'github';
}

export function NextAuthLoginButton({ name }: NextAuthLoginButtonProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const src =
    name === 'google' ? '/image/GoogleButton.svg' : '/image/GithubButton.svg';

  return (
    <Box
      position="relative"
      display="flex"
      width="fit"
      cursor="pointer"
      onClick={() => {
        if (process.env.NEXT_PUBLIC_NODE_ENV !== 'development') {
          toast.error('서버비가 없어서 로그인은 안돼요,,');
        } else if (name === 'google') {
          signIn(name, { redirect: true, callbackUrl: callbackUrl ?? '/' });
        } else {
          toast.error('서버비가 없어서 로그인은 안돼요,,');
        }
      }}
    >
      <Hover radius="full" color="white" />
      <Image src={src} alt="google_button" width={48} height={48} />
    </Box>
  );
}
