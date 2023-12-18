import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';

export default function PostsLayout({ children }: PropsWithChildren) {
  return <Box>{children}</Box>;
}
