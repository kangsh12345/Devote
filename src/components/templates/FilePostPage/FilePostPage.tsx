'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '../../atoms/Box';
import { ListItem, Popover } from '../../atoms/Popover';
import { PostHeader } from '../../organisms/Header';
import { PostSubHeader } from '../../organisms/PostSubHeader';

export interface FilePostPageProps {
  title: string;
  own: boolean;
  path: string;
}

export const FilePostPage = ({ title, own, path }: FilePostPageProps) => {
  const router = useRouter();
  const [isExist, setIsExist] = useState(false);

  const popoverList: ListItem[] = [
    { value: '대제목1', heading: 1 },
    { value: '대제목2', heading: 1 },
    { value: '중제목1', heading: 2 },
    { value: '소제목1', heading: 3 },
    { value: '대제목3', heading: 1 },
  ];

  const fullPath = `${path}/${title}`;

  useEffect(() => {
    console.log(fullPath);

    // TODO: 파일을 불러와야함
    if (title !== '' && path !== '')
      fetch('/api/post/getFile', {
        method: 'POST',
        body: JSON.stringify({ path: fullPath }),
      })
        .then(res => res.json())
        .then(data => {
          // data.exist ? setIsExist(data.exist) : router.push('/');
          console.log(data);
        });
  }, [fullPath, title, path, router]);

  return (
    <>
      {isExist && (
        <Box
          position="relative"
          height="full"
          minHeight="viewHeight"
          backgroundColor="backgroundBase"
        >
          <PostHeader path={path} title={title} />
          {own && <PostSubHeader path={fullPath} />}
          <Box
            display="flex"
            height="full"
            paddingY="6"
            paddingX="2"
            justifyContent="center"
          >
            <Popover size="md" list={popoverList} />
          </Box>
        </Box>
      )}
    </>
  );
};
