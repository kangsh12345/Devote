import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Sidebar } from '@/src/components/organisms/Sidebar';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Box display="flex" gap="0" width="full">
      <Sidebar />
      <Box width="full" overflow="hidden">
        {children}
      </Box>
    </Box>
  );
}
