'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Box } from '@/src/components/atoms/Box';
import { FilePostPage } from '@/src/components/templates/FilePostPage';
import { FolderPostPage } from '@/src/components/templates/FolderPostPage';

export default function PostPage() {
  const query = useSearchParams();
  const title = query.get('title') ?? '';

  const { data: session } = useSession();

  const param = useParams();
  const id = decodeURIComponent(decodeURIComponent(param.id));
  const slug = param.slug
    ? decodeURIComponent(decodeURIComponent(param.slug))
    : '';

  const currentFilePath =
    param.id && id === session?.user.dirName
      ? `${id}${slug ? `/${slug}` : ''}`
      : '';

  const own = param.id && id === session?.user.dirName ? true : false;

  return (
    <Box>
      {title ? (
        <FilePostPage title={title} own={own} path={currentFilePath} />
      ) : (
        <FolderPostPage />
      )}
    </Box>
  );
}
