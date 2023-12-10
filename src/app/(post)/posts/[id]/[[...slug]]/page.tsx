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
