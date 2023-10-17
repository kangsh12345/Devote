import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return <Box>{children}</Box>;
}
