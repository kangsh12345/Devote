import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Header } from '@/src/components/organisms/Header';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Box height="full" backgroundColor="backgroundElevatedPrimary">
      <Header type="auth" />
      <Box
        display="flex"
        height="full"
        paddingY="10"
        paddingX="2"
        justifyContent="center"
      >
        {children}
      </Box>
    </Box>
  );
}
