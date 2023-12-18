'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { Box } from '../../atoms/Box';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export const PostWritePage = () => {
  const query = useSearchParams();
  const title = query.get('title') ?? '';

  const [md, setMd] = useState<string | undefined>('# Hello World');

  return (
    <Box>
      <Box width="full" height="full">
        <MDEditor
          value={md}
          onChange={setMd}
          visiableDragbar={false}

          // className={
          //   cookies.mode === 'dark' ? 'dark-mode-class' : 'light-mode-class'
          // }
        />
      </Box>
    </Box>
  );
};
