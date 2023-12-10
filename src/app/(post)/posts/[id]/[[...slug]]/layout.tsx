import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';

export default function PostsLayout({ children }: PropsWithChildren) {
  return (
    <Box height="viewHeight" backgroundColor="backgroundElevatedPrimary">
      {children}
    </Box>
  );
}
