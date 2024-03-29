import { Box } from '../../atoms/Box';
import { Toc } from '../../atoms/Toc';
import { PostHeader } from '../../organisms/Header';
import { PostSubHeader } from '../../organisms/PostSubHeader';
import { PreivewMDEditor } from '../../organisms/PreviewMDEditor';
import * as styles from './filePostPage.css';
import { useFilePost } from './useFilePost';

export interface FilePostPageProps {
  title: string;
  own: boolean;
  path: string;
}

export const FilePostPage = ({ title, own, path }: FilePostPageProps) => {
  const { isExist, date, md, setMd, name, fullPath } = useFilePost({
    title,
    path,
  });

  return (
    <>
      {isExist && (
        <Box
          position="relative"
          height="full"
          minHeight="viewHeight"
          backgroundColor="backgroundBase"
        >
          <PostHeader name={name} title={title} date={date} own={own} />
          <PostSubHeader fullPath={fullPath} path={path} own={own} />
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
