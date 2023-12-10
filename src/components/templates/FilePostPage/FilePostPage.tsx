'use client';

import { Box } from '../../atoms/Box';
import { ListItem, Popover } from '../../atoms/Popover';
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
  const popoverList: ListItem[] = [
    { value: '대제목1', heading: 1 },
    { value: '대제목2', heading: 1 },
    { value: '중제목1', heading: 2 },
    { value: '소제목1', heading: 3 },
    { value: '대제목3', heading: 1 },
  ];

  return (
    <Box
      position="relative"
      height="full"
      minHeight="viewHeight"
      backgroundColor="backgroundBase"
      onClick={() => console.log(params, title)}
    >
      <Header type="post" />
      <Box
        display="flex"
        height="full"
        // 여기 paiddng fimga랑 달라서 일단 나둠
        // paddingY="10"
        paddingY="6"
        paddingX="2"
        justifyContent="center"
      >
        <Popover size="md" list={popoverList} />
      </Box>
    </Box>
  );
};
