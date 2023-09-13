import { ReactNode } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Sidebar } from '@/src/components/organisms/Sidebar';

interface DashboardProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardProps) {
  return (
    <Box display="flex" gap="0" width="full">
      <Sidebar />
      <Box width="full">{children}</Box>
    </Box>
  );
}
