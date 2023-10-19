import { User as PrismaUser } from '@prisma/client';

import 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    name: string | null;
    dirName: string | null;
    email: string | null;
    image: string | null;
  }

  interface Session extends DefaultSession {
    id: string;
    sessionToken: string;
    userId: string;
    expires: string;
    user: Omit<PrismaUser, 'password', 'emailVerified'>;
  }
}
