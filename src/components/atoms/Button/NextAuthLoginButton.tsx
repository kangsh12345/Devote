'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Box } from '../Box';

export function NextAuthLoginButton() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col">
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <Box onClick={() => signOut()}>로그아웃</Box>
        </>
      ) : (
        <>
          Not signed in <br />
          <Box onClick={() => signIn()}>로그인</Box>
        </>
      )}
    </div>
  );
}
