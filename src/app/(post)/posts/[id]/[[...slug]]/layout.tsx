import { PropsWithChildren } from 'react';
import { Box } from '@/src/components/atoms/Box';
import { Header } from '@/src/components/organisms/Header';

export default function PostsLayout({ children }: PropsWithChildren) {
  return (
    <Box height="viewHeight" backgroundColor="backgroundElevatedPrimary">
      <Header type="folder" />
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
