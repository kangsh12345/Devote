'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { TextB, TextHFour, TextHOne, TextHTwo } from '@phosphor-icons/react';
import {
  commands,
  ContextStore,
  ExecuteState,
  ICommand,
  ICommandBase,
  MDEditorProps,
  RefMDEditor,
  TextAreaCommandOrchestrator,
} from '@uiw/react-md-editor';

import { Box } from '../../atoms/Box';
import * as styles from './postWritePage.css';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface MyCustomToolbarProps {
  editorRef: RefObject<RefMDEditor>;
}

interface CustomToolbarButtomProps {
  command: ICommand;
  executeCommand: () => void;
}

const h1: ICommand = {
  name: 'h1',
  keyCommand: 'h1',
  buttonProps: { 'aria-label': 'h1' },
  icon: (
    <Box className={styles.iconBox}>
      <TextHOne size="full" weight="duotone" />
    </Box>
  ),
  execute: (state, api) => {
    let modifyText = `# ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `# 텍스트`;
    }
    api.replaceSelection(modifyText);
  },
};
const h2: ICommand = {
  name: 'h2',
  keyCommand: 'h2',
  buttonProps: { 'aria-label': 'h2' },
  icon: (
    <Box className={styles.iconBox}>
      <TextHTwo size="full" weight="duotone" />
    </Box>
  ),
  execute: (state, api) => {
    let modifyText = `## ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `## 텍스트`;
    }
    api.replaceSelection(modifyText);
  },
};
const h3: ICommand = {
  name: 'h3',
  keyCommand: 'h3',
  buttonProps: { 'aria-label': 'h3' },
  icon: (
    <Box className={styles.iconBox}>
      <TextHFour size="full" weight="duotone" />
    </Box>
  ),
  execute: (state, api) => {
    let modifyText = `### ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `### 텍스트`;
    }
    api.replaceSelection(modifyText);
  },
};
const h4: ICommand = {
  name: 'h4',
  keyCommand: 'h4',
  buttonProps: { 'aria-label': 'h4' },
  icon: (
    <Box className={styles.iconBox}>
      <TextHOne size="full" weight="duotone" />
    </Box>
  ),
  execute: (state, api) => {
    let modifyText = `#### ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `#### 텍스트`;
    }
    api.replaceSelection(modifyText);
  },
};
const bold: ICommand = {
  name: 'bold',
  keyCommand: 'bold',
  buttonProps: { 'aria-label': 'bold' },
  icon: (
    <Box className={styles.iconBox}>
      <TextB size="full" weight="duotone" />
    </Box>
  ),
  execute: (state, api) => {
    let modifyText = `**${state.selectedText}**\n`;
    if (!state.selectedText) {
      modifyText = `**텍스트** `;
    }
    // else if (state.selectedText === `**${state.selectedText}**`) {
    //   modifyText = state.selectedText;
    // }
    api.replaceSelection(modifyText);
  },
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const CustomToolbarButton: React.FC<{ command: ICommand }> = ({ command }) => {
  const executeCommand = () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textArea) {
      const orchestrator = new TextAreaCommandOrchestrator(textArea);
      orchestrator.executeCommand(command);
    }
  };

  return <button onClick={executeCommand}>{command.name}</button>;
};

const MyCustomToolbar = () => {
  return (
    // css 넣어주자
    <div>
      <CustomToolbarButton command={h1} />
    </div>
  );
};

export const PostWritePage = () => {
  // const query = useSearchParams();
  // const title = query.get('title') ?? '';
  const [md, setMd] = useState<string | undefined>('');
  const editorRef = useRef<RefMDEditor>(null);

  return (
    <Box>
      <Box width="full" height="full">
        <Box className={styles.root}>
          <MyCustomToolbar />
          <MDEditor
            ref={editorRef}
            height="100%"
            value={md}
            onChange={setMd}
            visibleDragbar={false}
            hideToolbar={true}
          />
        </Box>
      </Box>
    </Box>
  );
};
