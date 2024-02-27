'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '../../atoms/Box';
import { Toc } from '../../atoms/Toc';
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
                <PreivewMDEditor md={md} setMd={setMd} own={own} />
              </Box>
            </Box>
            <Toc size="md" content={md ?? ''} />
          </Box>
        </Box>
      )}
    </>
  );
};
