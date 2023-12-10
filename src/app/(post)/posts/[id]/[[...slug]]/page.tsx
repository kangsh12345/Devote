'use client';

import { useSearchParams } from 'next/navigation';
import { Box } from '@/src/components/atoms/Box';
import { FilePostPage } from '@/src/components/templates/FilePostPage';
import { FolderPostPage } from '@/src/components/templates/FolderPostPage';

interface PageParams {
  id: string;
  slug: string[];
}

export default function PostPage({ params }: { params: PageParams }) {
  const query = useSearchParams();
  const title = query.get('title') ?? '';

  // 만약 query가 ?title=파일 이름으로 되어있으면 file post페이지 보여주고 아니면 folder list 페이지 보여주기
  return (
    <Box>
      {title ? (
        <FilePostPage params={params} title={title} />
      ) : (
        <FolderPostPage params={params} />
      )}
    </Box>
  );
}
