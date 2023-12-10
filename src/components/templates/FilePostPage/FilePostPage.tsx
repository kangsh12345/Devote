'use client';

import { Box } from '../../atoms/Box';
import { Header } from '../../organisms/Header';

interface PageParams {
  id: string;
  slug: string[];
}

export interface FilePostPageProps {
  params: PageParams;
  title: string;
}

export const FilePostPage = ({ params, title }: FilePostPageProps) => {
  return (
    <Box onClick={() => console.log(params, title)}>
      <Header type="post" />
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
