export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/settings/:path*'],
};

// TODO: 추후 로그인 withAuth withOutAuth 구체화 시키기
