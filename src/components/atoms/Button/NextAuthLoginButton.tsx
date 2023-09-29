'use client';

import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Box } from '../Box';
import { Hover } from '../Hover';

export interface NextAuthLoginButtonProps {
  name: 'google' | 'github';
}

export function NextAuthLoginButton({ name }: NextAuthLoginButtonProps) {
  const { data: session } = useSession();

  const src =
    name === 'google' ? '/image/GoogleButton.svg' : '/image/GithubButton.svg';

  return (
    <Box>
      {session && (
        <>
          Signed in as {session.user?.email} <br />
          <Box onClick={() => signOut()}>로그아웃</Box>
        </>
      )}
      <Box
        position="relative"
        display="flex"
        width="fit"
        cursor="pointer"
        onClick={() => signIn(name, { redirect: true, callbackUrl: '/' })}
      >
        <Hover radius="full" color="white" />
        <Image src={src} alt="google_button" width={48} height={48} />
      </Box>
    </Box>
  );
}
