'use client';

import { useSearchParams } from 'next/navigation';
import { Box } from '@/src/components/atoms/Box';
import { FilePostPage } from '@/src/components/templates/FilePostPage';
import { FolderPostPage } from '@/src/components/templates/FolderPostPage';

export default function PostPage() {
  const query = useSearchParams();
  const title = query.get('title') ?? '';

  return (
    <Box>{title ? <FilePostPage title={title} /> : <FolderPostPage />}</Box>
  );
}
