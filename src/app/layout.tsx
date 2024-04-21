import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/components/atoms/ThemeProvider';
import { getThemeMode } from '@/src/utils/cookies';
import { Toaster } from 'react-hot-toast';

import { Box } from '../components/atoms/Box';
import { Sidebar } from '../components/organisms/Sidebar';
import AuthSession from './AuthSession';
import ReactQueryProvider from './ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Devote',
  description: '개인 폴더 공간을 이용해서 블로그를 제작해보세요.',
  icons: {
    icon: '/image/Devote.svg',
  },
};

export const siteTitle = 'Devote';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" data-color-mode="light">
      <body>
        <main>
          <ReactQueryProvider>
            <AuthSession>
              <ThemeProvider defaultMode={getThemeMode() ?? 'light'}>
                <div id="portal" />
                <Toaster />
                <Box display="flex" gap="0" width="full" minWidth="80">
                  <Box
                    width="auto"
                    position="sticky"
                    top="0"
                    height="viewHeight"
                  >
                    <Sidebar />
                  </Box>
                  <Box position="relative" width="full" overflow="hidden">
                    {children}
                  </Box>
                </Box>
              </ThemeProvider>
            </AuthSession>
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
