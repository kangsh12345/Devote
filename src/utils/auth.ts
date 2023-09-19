import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // pages: {
  //   signIn: '/',
  //   signOut: '/',
  // },
  providers: [
    GoogleProvider({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''),
      clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ''),
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('fire signin Callback');
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log('fire redirect Callback');
    //   return baseUrl;
    // },
    // async session({ session, user, token }) {
    //   console.log('fire SESSION Callback');
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id,
    //       randomKey: token.randomKey,
    //     },
    //   };
    // },
    async session({ session, user }) {
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
};
