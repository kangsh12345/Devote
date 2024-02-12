'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '../../atoms/Box';
import { ListItem, Popover } from '../../atoms/Popover';
import { PostHeader } from '../../organisms/Header';
import { PostSubHeader } from '../../organisms/PostSubHeader';
import { PreivewMDEditor } from '../../organisms/PreviewMDEditor';
import * as styles from './filePostPage.css';

export interface FilePostPageProps {
  title: string;
  own: boolean;
  path: string;
}

export const FilePostPage = ({ title, own, path }: FilePostPageProps) => {
  const router = useRouter();
  const [isExist, setIsExist] = useState(false);
  const [date, setDate] = useState(new Date());
  const [md, setMd] = useState<string | undefined>();
  const [name, setName] = useState('');

  const popoverList: ListItem[] = [
    { value: '대제목1', heading: 1 },
    { value: '대제목2', heading: 1 },
    { value: '중제목1', heading: 2 },
    { value: '소제목1', heading: 3 },
    { value: '대제목3', heading: 1 },
  ];

  const titles = md?.split('\n').filter(item => item.includes('# '));

  // const result =
  titles
    ?.filter(item => item[0] === '#')
    .map(item => {
      const count = item.match(/#/g)?.length;

      return {
        value: item.split('# ')[1].replace(/`/g, '').trim(),
        heading: count,
      };
    });

  const fullPath = `${path}/${title}`;

  useEffect(() => {
    if (title !== '' && path !== '')
      fetch('/api/post/getFile', {
        method: 'POST',
        body: JSON.stringify({ path: fullPath }),
      })
        .then(res => res.json())
        .then(data => {
          data.exist ? setIsExist(data.exist) : router.push('/');
          setName(data.data.name);
          setDate(data.data.date);
          setMd(data.data.content);
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
          <PostHeader name={name} path={path} title={title} date={date} />
          {own && <PostSubHeader path={fullPath} />}
          <Box display="flex" height="full" justifyContent="center">
            <Box width="full" height="full">
              <Box className={styles.markdownBox({ own })}>
                <PreivewMDEditor md={md} setMd={setMd} />
              </Box>
            </Box>
            <Popover size="md" list={popoverList} />
          </Box>
        </Box>
      )}
    </>
  );
};
