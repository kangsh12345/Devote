import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Header } from '@/src/components/organisms/Header';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Box>
      <Header type="auth" />
      {children}
    </Box>
  );
}
