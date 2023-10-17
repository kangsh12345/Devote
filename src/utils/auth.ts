import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
        },
        password: {
          label: '비밀번호',
          type: 'password',
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

        if (user.user) {
          return user.user;
        } else {
          return null;
        }
      },
    }),

    Credentials({
      id: 'signup',
      name: 'Signup',
      credentials: {
        name: {
          label: '이름',
          type: 'text',
        },
        email: {
          label: '이메일',
          type: 'text',
        },
        password: {
          label: '비밀번호',
          type: 'password',
        },
        image: {
          label: '대표 이미지',
          type: 'text',
        },
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/sign-up/email`,
          {
            method: 'POST',

            body: JSON.stringify({
              name: credentials?.name,
              email: credentials?.email,
              password: credentials?.password,
              image: credentials?.image,
            }),
          },
        );

        const user = await res.json();

        if (user.user) {
          return user.user;
        } else {
          return null;
        }
      },
    }),

    Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID || ''),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET || ''),
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: String(process.env.GITHUB_CLIENT_ID || ''),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET || ''),
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
