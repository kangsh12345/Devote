---
name: '강승헌'
title: 'NextAuth 소셜 로그인'
date: '2024-05-05 20:55:40'
---
![image.png](https://firebasestorage.googleapis.com/v0/b/devote-2cce5.appspot.com/o/images%2F858a7eda-4f35-42e4-9714-2973c99abc29.png?alt=media&token=3a436590-50fd-48ff-b600-cb6d832288df)


***

# NextAuth.js
이메일 Credentials 로그인 + Google, Github 소셜 로그인

## 필요 라이브러리 설치

> 1. planetscale + prisma
```javascript 
npm install @next-auth/prisma-adapter @prisma/client
npm install -D prisma
```
> 2. NextAuth
```javascript
npm install next-auth
```

## 세팅
공유 세션 상태 구성 : useSession을 사용하기 위해 SessionProvider 추가
```javascript
// src/app/AuthSession.tsx
'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthSession({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}


// src/app/layout.tsx
...
import AuthSession from './AuthSession';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <main>
    	  ...
            <AuthSession>
    			...
                    {children}
    			...
            </AuthSession>
		  ...
        </main>
      </body>
    </html>
  );
}

```

<br>

## API route

> * NextAuth Option 설정
```javascript
// /src/utils/auth.ts
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
>
const prisma = new PrismaClient();
>
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
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
>
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
>
        const user = await res.json();
>
        if (user.user) {
          return user.user;
        } else {
          return null;
        }
      },
    }),
>
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
    // 세션은 jwt 방식으로 1일(1*24*60*60) 동안 유지하도록 함
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
>
      return session;
    },
>
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
>
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
```
> * NextAuth API
```javascript
// /src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/src/utils/auth';
>
const handler = NextAuth(authOptions);
>
export { handler as GET, handler as POST };
```
> * 이메일 회원가입 API
```javascript
// /src/app/api/auth/sign-up/email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
>
const prisma = new PrismaClient();
>
interface RequestBody {
  name: string;
  email: string;
  password: string;
  image: string;
}
>
async function signUp(info: RequestBody) {
  try {
    const response = await prisma.user.create({
      data: {
        name: info.name,
        email: info.email,
        // bcrypt 패스워드 암호화
        password: await bcrypt.hash(info.password, 10),
        image: info.image,
      },
    });
>
    const { password, ...result } = response;
>
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
>
export async function POST(req: NextRequest) {
  const request: RequestBody = await req.json();
>
  try {
    const response = await signUp(request);
>
    return NextResponse.json(
      { user: response, message: `Success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `이메일 회원가입 실패` },
      { status: 400 },
    );
  }
}
```
> * 이메일 로그인 API
```javascript
// /src/app/api/auth/sign-in/email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
>
const prisma = new PrismaClient();
>
interface RequestBody {
  email: string;
  password: string;
}
>
async function signIn(info: RequestBody) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        email: info.email,
      },
    });
>
    if (
      response &&
      response.password &&
      (await bcrypt.compare(info.password, response.password))
    ) {
      const { password, ...userWithoutPass } = response;
>
      console.log(userWithoutPass);
      return userWithoutPass;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
>
export async function POST(req: NextRequest) {
  const request: RequestBody = await req.json();
>
  try {
    const response = await signIn(request);
>
    return NextResponse.json(
      { user: response, message: `Success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `이메일 로그인 실패` },
      { status: 400 },
    );
  }
}
```


<br>

## 로그인/회원가입 페이지

```javascript
// src/components/organisms/Auth.tsx
'use client';
>
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Box } from '@/src/components/atoms/Box';
import { Button, NextAuthLoginButton } from '@/src/components/atoms/Button';
import { Divide } from '@/src/components/atoms/Divide';
import { Input } from '@/src/components/atoms/Input';
import { Stack } from '@/src/components/atoms/Stack';
>
import * as styles from './auth.css';
>
export interface AuthProps {
  type: 'signin' | 'signup';
}
>
export const Auth = ({ type }: AuthProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
>
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
>
  const title = type === 'signin' ? '로그인' : '회원가입';
>
  const handleEmailSignup = () => {
    fetch(`/api/auth/sign-up/email`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        image: 'https://source.boringavatars.com/beam',
      }),
    }).then(data => console.log(data));
  };
>
  const handleEmailSignin = async () => {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: callbackUrl ?? '/',
    });
  };
>
  return (
    <Box className={styles.root}>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.inputStack}>
        {type === 'signup' && (
          <Input
            label="email name"
            hideLabel
            placeholder="이름을 입력해주세요"
            variant="outline"
            size="md"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        )}
        <Input
          label="email email"
          hideLabel
          placeholder="이메일을 입력해주세요"
          variant="outline"
          size="md"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          label="email password"
          // 추후 type password 구현
          hideLabel
          placeholder="비밀번호을 입력해주세요"
          variant="outline"
          size="md"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="2.5" width="full">
        {type === 'signin' ? (
          <Box onClick={handleEmailSignin} width="full">
            <Button size="lg" radius="md" color="brand">
              이메일 로그인
            </Button>
          </Box>
        ) : (
          <Box onClick={handleEmailSignup} width="full">
            <Button size="lg" radius="md" color="brand">
              이메일 회원가입
            </Button>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="flex-end"
          fontSize="1"
          color="textTertiary"
          gap="1"
        >
          {type === 'signin' ? '계정이 없으신가요?' : '계정이 이미 있으신가요?'}
          <Link href={`/auth/${type === 'signin' ? 'signup' : 'signin'}`}>
            <Box color="brandPrimary">
              {type === 'signin' ? '회원가입' : '로그인'}
            </Box>
          </Link>
        </Box>
      </Box>
      <Divide />
      <Box
        display="flex"
        width="full"
        justifyContent="flex-start"
        fontSize="1"
        color="textTertiary"
      >
        소셜 회원가입
      </Box>
      <Stack space="12" direction="horizontal">
        <NextAuthLoginButton name="google" />
        <NextAuthLoginButton name="github" />
      </Stack>
    </Box>
  );
};
```

<br>

## NextAuth middleware 설정
> *** withAuth : 인증이 있는 사용자만 들어올 수 있는 Url 설정**
즐겨찾기 페이지, 설정 페이지를 로그인하지 않은 사용자가 들어올 시 로그인 페이지로 redirect
><br>
> *** withOutAuth : 인증이 있는 사용자가 들어올 수 없는 Url 설정**
로그인한 사용자가 로그인 페이지, 회원가입 페이지에 들어올 시 root page로 redirect

```javascript
import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

const withAuthList: string[] = ['/favorites', '/settings'];
const withOutAuthList: string[] = ['/auth/:path*'];

const withAuth = (req: NextRequest, token: JWT | null) => {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (!token) {
    url.pathname = '/auth/signin';
    url.search = `callbackUrl=${pathname}`;

    return NextResponse.redirect(url);
  }
};

const withOutAuth = (
  req: NextRequest,
  token: JWT | null,
  to: string | null,
) => {
  const url = req.nextUrl.clone();

  if (token) {
    url.pathname = to ?? '/';
    url.search = '';

    return NextResponse.redirect(url);
  }
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const { searchParams } = req.nextUrl;
  const callbackUrl = searchParams.get('callbackUrl');

  const isWithAuth = withAuthList.includes(pathname);
  const isWithOutAuth = pathname.startsWith('/auth');

  if (isWithAuth) return withAuth(req, token);
  else if (isWithOutAuth) return withOutAuth(req, token, callbackUrl);
}

export const config = {
  matcher: [...withAuthList, ...withOutAuthList],
};
```

***
## 동작
email 로그인
![](https://velog.velcdn.com/images/kangsh12345/post/e6d7a1c2-251d-4026-9355-c51290ce5e84/image.gif)

소셜 로그인
![](https://velog.velcdn.com/images/kangsh12345/post/dacb4af6-00d6-4a0f-8640-48a51393d8fd/image.gif)


<br>

추후 아이디, 이메일, 패스워드 valid 유효성 검사 기능 추가 예정


***

## GoogleProvider 설정
참고 : https://velog.io/@uni/NextAuth.js-%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8-Next%EB%B2%84%EC%A0%84-13.4.2

## GitHubProvider 설정
참고 : https://velog.io/@js43o/next-auth-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%82%AC%EC%9A%A9%EB%B2%95%EA%B3%BC-%EC%9C%A0%EC%9D%98%EC%82%AC%ED%95%AD

<br>

***

## 참고링크
NextAuth 공식 페이지: https://next-auth.js.org/getting-started/example

NextAuth middelware 참고 블로그 : https://velog.io/@dosomething/Next-auth-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84#-page-protection-callback-%EC%B2%98%EB%A6%AC--callbackurl-%EB%B3%B4%EC%95%88-

Prisma + PlanetScale + NextAuth + Nextjs 참고 : https://velog.io/@ckstn0777/Next.js-Prisma-PlanetScale-NextAuth-%EC%9D%B8%EC%A6%9D-%EC%B2%98%EB%A6%AC-2























