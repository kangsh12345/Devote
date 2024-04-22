'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Box } from '../../atoms/Box';
import { FilePostPage } from '../FilePostPage';
import { FolderPostPage } from '../FolderPostPage';

export function PostSidePage() {
  const query = useSearchParams();
  const title = query.get('title') ?? '';

  const { data: session } = useSession();

  const param = useParams();
  const id = decodeURIComponent(decodeURIComponent(param.id));
  const slug = param.slug
    ? decodeURIComponent(decodeURIComponent(param.slug))
    : '';

  const currentFilePath = param.id && `${id}${slug ? `/${slug}` : ''}`;

  const own = param.id && id === session?.user.dirName ? true : false;

  return (
    <Box>
      {title ? (
        <FilePostPage title={title} own={own} path={currentFilePath} />
      ) : (
        <FolderPostPage own={own} />
      )}
    </Box>
  );
}
