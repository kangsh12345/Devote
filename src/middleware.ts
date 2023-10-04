import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;

      if (token === null) {
        if (
          pathname.startsWith('/settings') ||
          pathname.startsWith('/favorites')
        ) {
          return false;
        }
      }
      return true;
    },
  },
});

// export const config = {
//   matcher: ['/settings/:path*', '/favorites/:path*'],
// };

// TODO: 1) 추후 로그인 withAuth withOutAuth 구체화 시키기 2) Auth에 대한 블로그 글 작성
//        (withAuth 사용해서 해보자)
// TODO: input password 형식 생성, email vaild 유효성 검사 추가
