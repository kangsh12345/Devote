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
  return NextResponse.json({ status: 400, message: '토근 에러' });
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
  return NextResponse.json({ status: 400, message: '토근 에러' });
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
