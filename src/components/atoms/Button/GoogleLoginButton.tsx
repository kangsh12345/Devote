'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Box } from '../Box';

export function GoogleLoginButton() {
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
          <Box onClick={() => signIn('google')}>로그인</Box>
        </>
      )}
    </div>
  );
}
