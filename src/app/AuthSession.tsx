'use client';
// import { SessionProvider } from 'next-auth/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Props = {
  children: React.ReactNode;
};

export default function AuthSession({ children }: Props) {
  // return <SessionProvider>{children}</SessionProvider>;
  return (
    <GoogleOAuthProvider
      clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
    >
      {children}
    </GoogleOAuthProvider>
  );
}
