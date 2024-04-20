'use client';

import { SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import remarkBreaks from 'remark-breaks';

import { Box } from '../../atoms/Box';
import * as styles from './previewMDEditor.css';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

type CustomMDEditorProps = {
  md: string | undefined;
  setMd: SetAtom<[SetStateAction<string | undefined>], void>;
  own: boolean;
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export const PreivewMDEditor = ({ md, setMd, own }: CustomMDEditorProps) => {
  return (
    <Box className={styles.root({ own })}>
      <MDEditor
        preview="preview"
        height="100%"
        value={md}
        onChange={setMd}
        visibleDragbar={false}
        previewOptions={{
          remarkPlugins: [[remarkBreaks]],
        }}
        hideToolbar={true}
      />
    </Box>
  );
};
