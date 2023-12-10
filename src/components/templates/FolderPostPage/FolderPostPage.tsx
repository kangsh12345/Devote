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
    <Box
      height="full"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
      onClick={() => console.log(params)}
    >
      <Header type="folder" />
      <Box
        display="flex"
        height="full"
        // 여기 paiddng fimga랑 달라서 일단 나둠
        // paddingY="10"
        paddingY="6"
        paddingX="2"
        justifyContent="center"
      ></Box>
    </Box>
  );
};
