'use client';

import { Box } from '../../atoms/Box';
import { Header } from '../../organisms/Header';

interface PageParams {
  id: string;
  slug: string[];
}

export interface FolderPostPageProps {
  params: PageParams;
}

export const FolderPostPage = (params: FolderPostPageProps) => {
  return (
    <Box onClick={() => console.log(params)}>
      <Header type="folder" />
      <Box
        display="flex"
        height="full"
        paddingY="10"
        paddingX="2"
        justifyContent="center"
      ></Box>
    </Box>
  );
};
