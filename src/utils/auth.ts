import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
          placeholder: '이메일',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호',
        },
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/sign-in/email`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        );

        const user = await res.json();

        return user.user;
      },
    }),
    // GoogleProvider({
    //   clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''),
    //   clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ''),
    // }),
  ],
  // session: {
  //   strategy: 'database',
  //   maxAge: 1 * 24 * 60 * 60,
  // },
  // callbacks: {
  //   async session({ session, user }) {
  //     session.id = user.id;
  //     return Promise.resolve(session);
  //   },
  // },
};
