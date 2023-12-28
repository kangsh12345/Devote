'use client';

import {
  ChangeEvent,
  DragEvent,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import fileUpload from '@/src/utils/fileUpload';
import insertToTextArea from '@/src/utils/insertToTextArea';
import onImagePasted from '@/src/utils/onImagePasted';
import {
  CodeSimple,
  Link,
  TextB,
  TextHFour,
  TextHOne,
  TextHThree,
  TextHTwo,
  TextStrikethrough,
  Tray,
} from '@phosphor-icons/react';
import {
  commands,
  ICommand,
  RefMDEditor,
  TextAreaCommandOrchestrator,
} from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';

import { Box } from '../../atoms/Box';
import { MarkdownDivide } from '../../atoms/Divide';
import * as styles from './postWritePage.css';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

type CustomToolbarButtonProps = {
  icon: ReactNode;
  command: ICommand;
};

type MyCustomToolbarProps = {
  setMd: (value: SetStateAction<string | undefined>) => void;
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const CustomToolbarButton = ({ icon, command }: CustomToolbarButtonProps) => {
  const executeCommand = () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textArea) {
      const orchestrator = new TextAreaCommandOrchestrator(textArea);
      orchestrator.executeCommand(command);
    }
  };

  return <Box onClick={executeCommand}>{icon}</Box>;
};

const MyCustomToolbar = ({ setMd }: MyCustomToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file && file.type.startsWith('image/')) {
      const url = await fileUpload(file);

      const insertedMarkdown = insertToTextArea(`![](${url})`);
      if (!insertedMarkdown) {
        return;
      }
      setMd(insertedMarkdown);
    }
  };

  const handleTrayClick = () => {
    fileInputRef.current?.click();
  };

  return (
    // css 넣어주자
    <Box className={styles.markdownContainer}>
      <Box className={styles.markdown}>
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <TextHOne size="full" weight="duotone" />
            </Box>
          }
          command={commands.title1}
        />
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <TextHTwo size="full" weight="duotone" />
            </Box>
          }
          command={commands.title2}
        />
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <TextHThree size="full" weight="duotone" />
            </Box>
          }
          command={commands.title3}
        />
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <TextHFour size="full" weight="duotone" />
            </Box>
          }
          command={commands.title4}
        />
        <MarkdownDivide />
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <TextB size="full" weight="duotone" />
            </Box>
          }
          command={commands.bold}
        />
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <TextStrikethrough size="full" weight="duotone" />
            </Box>
          }
          command={commands.strikethrough}
        />
        <MarkdownDivide />
        <Box>
          <Box className={styles.iconBox} onClick={handleTrayClick}>
            <Tray size="full" weight="duotone" />
          </Box>
          <Box
            as="input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            display="none"
            onChange={handleFileUpload}
          />
        </Box>
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <Link size="full" weight="duotone" />
            </Box>
          }
          command={commands.link}
        />
        <CustomToolbarButton
          icon={
            <Box className={styles.iconBox}>
              <CodeSimple size="full" weight="duotone" />
            </Box>
          }
          command={commands.codeBlock}
        />
      </Box>
    </Box>
  );
};

export const PostWritePage = () => {
  const query = useSearchParams();
  const title = query.get('title') ?? '';
  const [md, setMd] = useState<string | undefined>();
  const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
  const editorRef = useRef<RefMDEditor>(null);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragEnter(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragEnter(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragEnter(false);
  };

  return (
    <Box onClick={() => console.log(title)}>
      <Box width="full" height="full">
        <Box
          className={[
            styles.root,
            isDragEnter ? styles.dragEnterStyle : styles.defaultStyle,
          ]}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <MyCustomToolbar setMd={setMd} />
          <MDEditor
            ref={editorRef}
            height="100%"
            value={md}
            onChange={setMd}
            visibleDragbar={false}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
              remarkPlugins: [[remarkBreaks]],
            }}
            hideToolbar={true}
            textareaProps={{ placeholder: '내용을 작성해보세요.' }}
            onPaste={async event => {
              await onImagePasted(event.clipboardData, setMd);
            }}
            onDrop={async event => {
              event.preventDefault();
              await onImagePasted(event.dataTransfer, setMd);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
