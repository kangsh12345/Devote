'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
      onClick={() =>
        signIn(name, { redirect: true, callbackUrl: callbackUrl ?? '/' })
      }
    >
      <Hover radius="full" color="white" />
      <Image src={src} alt="google_button" width={48} height={48} />
    </Box>
  );
}
